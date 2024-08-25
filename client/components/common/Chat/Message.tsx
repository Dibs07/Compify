// components/Message.js
export default function Message({ message, isUser }:{
    message: string;
    isUser: boolean;
}) {
    return (
      <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
        <div
          className={`max-w-xs break-words p-3 rounded-lg ${
            isUser ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
          }`}
        >
          {message}
        </div>
      </div>
    );
  }
  