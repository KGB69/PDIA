import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Content } from './types';
import initialContent from './content.json';

interface ContentContextType {
    content: Content;
    updateContent: (newContent: Content) => void;
    isAdmin: boolean;
    setIsAdmin: (isAdmin: boolean) => void;
    saveChanges: () => Promise<void>;
    uploadImage: (file: File, filename: string) => Promise<string>;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [content, setContent] = useState<Content>(initialContent as Content);
    const [isAdmin, setIsAdmin] = useState(false);

    const updateContent = (newContent: Content) => {
        setContent(newContent);
    };

    const uploadImage = async (file: File, filename: string): Promise<string> => {
        const response = await fetch(`/api/upload-image?filename=${encodeURIComponent(filename)}`, {
            method: 'POST',
            body: file,
        });
        if (!response.ok) throw new Error('Upload failed');
        const data = await response.json();
        return data.url;
    };

    const saveChanges = async () => {
        try {
            const response = await fetch('/api/save-content', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(content),
            });
            if (!response.ok) throw new Error('Failed to save');
            alert('Changes saved successfully!');
        } catch (error) {
            console.error('Error saving content:', error);
            alert('Error saving changes. Is the dev server running?');
        }
    };

    return (
        <ContentContext.Provider value={{ content, updateContent, isAdmin, setIsAdmin, saveChanges, uploadImage }}>
            {children}
        </ContentContext.Provider>
    );
};

export const useContent = () => {
    const context = useContext(ContentContext);
    if (!context) {
        throw new Error('useContent must be used within a ContentProvider');
    }
    return context;
};
