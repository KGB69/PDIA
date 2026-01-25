import fs from 'fs';
import { join } from 'path';
import crypto from 'crypto';

// Determine data directory (persistent disk or local)
const isPersistentDiskAvailable = fs.existsSync('/data');
const dataDir = isPersistentDiskAvailable ? '/data' : process.cwd();
const analyticsFile = join(dataDir, 'analytics.json');

// Salt for IP hashing (use environment variable in production)
const SALT = process.env.ANALYTICS_SALT || 'pdia-analytics-salt-2026';

// Hash IP for privacy
function hashIP(ip) {
    return crypto.createHash('sha256')
        .update(ip + SALT)
        .digest('hex')
        .substring(0, 16);
}

// Initialize analytics file
function initAnalytics() {
    if (!fs.existsSync(analyticsFile)) {
        const initialData = {
            visitors: [],
            lastRotation: new Date().toISOString()
        };
        fs.writeFileSync(analyticsFile, JSON.stringify(initialData, null, 2));
        console.log('Analytics file initialized:', analyticsFile);
    }
}

// Log visitor
export function logVisitor(req) {
    try {
        // Skip API calls and static assets
        if (req.path.startsWith('/api/') ||
            req.path.startsWith('/uploads/') ||
            req.path.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2)$/)) {
            return;
        }

        const data = JSON.parse(fs.readFileSync(analyticsFile, 'utf8'));

        const visitorLog = {
            timestamp: new Date().toISOString(),
            ipHash: hashIP(req.ip || req.connection.remoteAddress || 'unknown'),
            userAgent: req.headers['user-agent'] || 'unknown',
            path: req.path,
            referrer: req.headers['referer'] || 'direct',
            method: req.method
        };

        data.visitors.push(visitorLog);

        // Rotate logs if older than 90 days
        const ninetyDaysAgo = new Date();
        ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
        data.visitors = data.visitors.filter(v => new Date(v.timestamp) > ninetyDaysAgo);

        fs.writeFileSync(analyticsFile, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error logging visitor:', error);
    }
}

// Get analytics stats
export function getAnalyticsStats() {
    try {
        initAnalytics();
        const data = JSON.parse(fs.readFileSync(analyticsFile, 'utf8'));
        const visitors = data.visitors || [];

        // Calculate stats
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const thisWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);

        const todayVisitors = visitors.filter(v => new Date(v.timestamp) >= today);
        const weekVisitors = visitors.filter(v => new Date(v.timestamp) >= thisWeek);
        const monthVisitors = visitors.filter(v => new Date(v.timestamp) >= thisMonth);

        // Unique visitors (by IP hash)
        const uniqueToday = new Set(todayVisitors.map(v => v.ipHash)).size;
        const uniqueWeek = new Set(weekVisitors.map(v => v.ipHash)).size;
        const uniqueMonth = new Set(monthVisitors.map(v => v.ipHash)).size;
        const uniqueAllTime = new Set(visitors.map(v => v.ipHash)).size;

        // Top pages
        const pageCounts = {};
        visitors.forEach(v => {
            pageCounts[v.path] = (pageCounts[v.path] || 0) + 1;
        });
        const topPages = Object.entries(pageCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10)
            .map(([path, count]) => ({ path, count }));

        // Top referrers
        const referrerCounts = {};
        visitors.forEach(v => {
            if (v.referrer !== 'direct') {
                const url = new URL(v.referrer).hostname;
                referrerCounts[url] = (referrerCounts[url] || 0) + 1;
            }
        });
        const topReferrers = Object.entries(referrerCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10)
            .map(([referrer, count]) => ({ referrer, count }));

        return {
            totalPageViews: visitors.length,
            uniqueVisitors: {
                today: uniqueToday,
                week: uniqueWeek,
                month: uniqueMonth,
                allTime: uniqueAllTime
            },
            pageViews: {
                today: todayVisitors.length,
                week: weekVisitors.length,
                month: monthVisitors.length
            },
            topPages,
            topReferrers,
            recentVisitors: visitors.slice(-50).reverse() // Last 50 visitors
        };
    } catch (error) {
        console.error('Error getting analytics stats:', error);
        return null;
    }
}

// Initialize on module load
initAnalytics();
