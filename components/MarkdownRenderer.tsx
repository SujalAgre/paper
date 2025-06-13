import React from "react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from "remark-gfm";
import { Components } from "react-markdown";

type MarkdownRendererProps = {
    content: string;
    inline?: boolean;
    className?: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ 
    content, 
    inline = false, 
    className = "" 
}) => {
    const components: Components = {
        h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mt-6 mb-4" {...props} />,
        h2: ({ node, ...props }) => <h2 className="text-2xl font-semibold mt-5 mb-3" {...props} />,
        h3: ({ node, ...props }) => <h3 className="text-xl font-medium mt-4 mb-2" {...props} />,
        h4: ({ node, ...props }) => <h4 className="text-lg font-medium mt-3 mb-2" {...props} />,
        h5: ({ node, ...props }) => <h5 className="text-base font-medium mt-2 mb-1" {...props} />,
        h6: ({ node, ...props }) => <h6 className="text-sm font-medium mt-2 mb-1" {...props} />,
        p: ({ node, ...props }) => (
            <p className={inline ? "inline" : "mb-3"} {...props} />
        ),
        strong: ({ node, ...props }) => <strong className="font-bold" {...props} />,
        em: ({ node, ...props }) => <em className="italic" {...props} />,
        del: ({ node, ...props }) => <del className="line-through" {...props} />,
        blockquote: ({ node, ...props }) => (
            <blockquote className="border-l-4 border-gray-400 pl-4 italic text-gray-700 my-4" {...props} />
        ),
        hr: () => <hr className="my-6 border-t border-gray-300" />,
        ul: ({ node, ...props }) => (
            <ul className={`list-disc list-inside ${inline ? "inline" : "mb-3"}`} {...props} />
        ),
        ol: ({ node, ...props }) => (
            <ol className={`list-decimal list-outside ml-6 ${inline ? "inline" : "mb-3"}`} {...props} />
        ),
        li: ({ node, ...props }) => <li className="mb-1" {...props} />,
        a: ({ node, ...props }) => (
            <a 
                className="text-blue-600 underline hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" 
                target="_blank" 
                rel="noopener noreferrer" 
                {...props} 
            />
        ),
        img: ({ node, ...props }) => (
            <img 
                className="my-4 max-w-full h-auto rounded" 
                {...props} 
                alt={props.alt || "image"}
                loading="lazy"
            />
        ),
        
        // Code styling
        code: ({ node, ...props }) => {
            const isInline = !props.className?.includes('language-');
            return isInline 
                ? <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono" {...props} />
                : <code className="block bg-gray-100 p-4 rounded-lg text-sm font-mono overflow-x-auto whitespace-pre" {...props} />
        },
        pre: ({ node, ...props }) => (
            <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto my-4" {...props} />
        ),
        
        // Table styling
        table: ({ node, ...props }) => (
            <div className="overflow-x-auto my-4">
                <table className="table-auto border-collapse w-full border border-gray-300" {...props} />
            </div>
        ),
        thead: ({ node, ...props }) => <thead className="bg-gray-100" {...props} />,
        tbody: ({ node, ...props }) => <tbody {...props} />,
        tr: ({ node, ...props }) => <tr className="border-b border-gray-200" {...props} />,
        th: ({ node, ...props }) => (
            <th className="text-left font-medium p-3 border-r border-gray-300 last:border-r-0" {...props} />
        ),
        td: ({ node, ...props }) => (
            <td className="p-3 border-r border-gray-300 last:border-r-0" {...props} />
        ),
    };

    return (
        <div className={`markdown-content ${className}`}>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={components}
                // Disable certain elements when inline
                disallowedElements={inline ? ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'hr', 'table'] : undefined}
                unwrapDisallowed={inline}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
};

export default MarkdownRenderer;