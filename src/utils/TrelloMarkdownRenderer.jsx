import Markdown from 'markdown-to-jsx';



export default function TrelloMarkdownRenderer({ content, className = '' }) {
  const processedContent = content
    ? content.replace(/\n/g, '  \n') // Single line break support
    : '';

    

  return (
    <Markdown
      className={className}
      options={{
        forceBlock: false, // Allow inline rendering
        overrides: {
          // Bold text
          strong: {
            props: {
              className: 'font-bold',
            },
          },
          // Italic text
          em: {
            props: {
              className: 'italic',
            },
          },
          // Strikethrough
          del: {
            props: {
              className: 'line-through text-gray-500',
            },
          },
          // Links
          a: {
            props: {
              className: 'hover:text-[#2C56A0] transition-colors duration-300',
              target: '_blank',
              rel: 'noopener noreferrer',
            },
          },
          // Headings
          h1: {
            props: {
              className: 'text-4xl font-bold mb-4 mt-6',
            },
          },
          h2: {
            props: {
              className: 'text-3xl font-bold mb-3 mt-5',
            },
          },
          h3: {
            props: {
              className: 'text-2xl font-bold mb-3 mt-4',
            },
          },
          h4: {
            props: {
              className: 'text-xl font-bold mb-2 mt-3',
            },
          },
          h5: {
            props: {
              className: 'text-lg font-bold mb-2 mt-2',
            },
          },
          h6: {
            props: {
              className: 'text-base font-bold mb-2 mt-2',
            },
          },
          // Paragraphs
          p: {
            props: {
              className: 'mb-2',
            },
          },
          // Blockquote
          blockquote: {
            props: {
              className: 'border-l-4 border-gray-300 pl-4 my-4 italic text-gray-700',
            },
          },
          // Ordered list
          ol: {
            props: {
              className: 'list-decimal ml-6 my-2 space-y-1',
            },
          },
          // Unordered list
          ul: {
            props: {
              className: 'list-disc ml-6 my-2 space-y-1',
            },
          },
          // List items
          li: {
            props: {
              className: 'mb-1',
            },
          },
          // Inline code
          code: {
            props: {
              className: 'bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono text-gray-800',
            },
          },
          // Code block
          pre: {
            props: {
              className: 'bg-gray-100 p-4 rounded my-4 overflow-x-auto',
            },
          },
          // Horizontal rule / Divider
          hr: {
            props: {
              className: 'my-6 border-t-2 border-gray-300',
            },
          },
        },
      }}
    >
      {processedContent}
    </Markdown>
  );
}
