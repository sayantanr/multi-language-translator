import React, { useState } from 'react';
import { Upload, FileText, Image, Languages, Copy, Download } from 'lucide-react';

const LANGUAGES = [
  "Afrikaans", "Albanian", "Amharic", "Arabic", "Armenian", "Assamese", "Aymara", 
  "Azerbaijani", "Bambara", "Basque", "Belarusian", "Bengali", "Bhojpuri", "Bosnian", 
  "Bulgarian", "Burmese", "Catalan", "Cebuano", "Chinese (Simplified)", "Chinese (Traditional)", 
  "Corsican", "Croatian", "Czech", "Danish", "Dhivehi", "Dogri", "Dutch", "English", 
  "Esperanto", "Estonian", "Ewe", "Filipino (Tagalog)", "Finnish", "French", "Frisian", 
  "Galician", "Georgian", "German", "Greek", "Guarani", "Gujarati", "Haitian Creole", 
  "Hausa", "Hawaiian", "Hebrew", "Hindi", "Hmong", "Hungarian", "Icelandic", "Igbo", 
  "Ilocano", "Indonesian", "Irish", "Italian", "Japanese", "Javanese", "Kannada", "Kazakh", 
  "Khmer", "Kinyarwanda", "Konkani", "Korean", "Krio", "Kurdish (Kurmanji)", "Kurdish (Sorani)", 
  "Kyrgyz", "Lao", "Latin", "Latvian", "Lingala", "Lithuanian", "Luganda", "Luxembourgish", 
  "Macedonian", "Maithili", "Malagasy", "Malay", "Malayalam", "Maltese", "Maori", "Marathi", 
  "Meiteilon (Manipuri)", "Mizo", "Mongolian", "Nepali", "Norwegian", "Odia (Oriya)", "Oromo", 
  "Pashto", "Persian (Farsi)", "Polish", "Portuguese", "Punjabi", "Quechua", "Romanian", 
  "Russian", "Samoan", "Sanskrit", "Scottish Gaelic", "Sepedi", "Serbian", "Sesotho", "Shona", 
  "Sindhi", "Sinhala", "Slovak", "Slovenian", "Somali", "Spanish", "Sundanese", "Swahili", 
  "Swedish", "Tajik", "Tamil", "Tatar", "Telugu", "Thai", "Tigrinya", "Tsonga", "Turkish", 
  "Turkmen", "Twi", "Ukrainian", "Urdu", "Uyghur", "Uzbek", "Vietnamese", "Welsh", "Xhosa", 
  "Yiddish", "Yoruba", "Zulu"
];

export default function TranslatorApp() {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('English');
  const [targetLanguage, setTargetLanguage] = useState('Spanish');
  const [isTranslating, setIsTranslating] = useState(false);
  const [fileName, setFileName] = useState('');

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setFileName(file.name);
    setIsTranslating(true);

    try {
      if (file.type === 'application/pdf') {
        // For PDFs, we'll extract text using PDF.js or similar
        // Since we can't use external libraries easily, we'll use the Anthropic API
        const reader = new FileReader();
        reader.onload = async (e) => {
          const base64Data = e.target.result.split(',')[1];
          
          const response = await fetch("https://api.anthropic.com/v1/messages", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: "claude-sonnet-4-20250514",
              max_tokens: 1000,
              messages: [
                {
                  role: "user",
                  content: [
                    {
                      type: "document",
                      source: {
                        type: "base64",
                        media_type: "application/pdf",
                        data: base64Data
                      }
                    },
                    {
                      type: "text",
                      text: "Extract all text from this PDF document. Return only the extracted text, nothing else."
                    }
                  ]
                }
              ]
            })
          });

          const data = await response.json();
          const extractedText = data.content.map(item => item.type === "text" ? item.text : "").join("\n");
          setInputText(extractedText);
          setIsTranslating(false);
        };
        reader.readAsDataURL(file);
      } else if (file.type.startsWith('image/')) {
        // For images, perform OCR
        const reader = new FileReader();
        reader.onload = async (e) => {
          const base64Data = e.target.result.split(',')[1];
          
          const response = await fetch("https://api.anthropic.com/v1/messages", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: "claude-sonnet-4-20250514",
              max_tokens: 1000,
              messages: [
                {
                  role: "user",
                  content: [
                    {
                      type: "image",
                      source: {
                        type: "base64",
                        media_type: file.type,
                        data: base64Data
                      }
                    },
                    {
                      type: "text",
                      text: "Extract all visible text from this image. Return only the extracted text, nothing else."
                    }
                  ]
                }
              ]
            })
          });

          const data = await response.json();
          const extractedText = data.content.map(item => item.type === "text" ? item.text : "").join("\n");
          setInputText(extractedText);
          setIsTranslating(false);
        };
        reader.readAsDataURL(file);
      } else if (file.type === 'text/plain') {
        // For text files
        const reader = new FileReader();
        reader.onload = (e) => {
          setInputText(e.target.result);
          setIsTranslating(false);
        };
        reader.readAsText(file);
      }
    } catch (error) {
      console.error('Error processing file:', error);
      alert('Error processing file. Please try again.');
      setIsTranslating(false);
    }
  };

  const handleTranslate = async () => {
    if (!inputText.trim()) {
      alert('Please enter or upload text to translate');
      return;
    }

    setIsTranslating(true);
    setTranslatedText('');

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [
            {
              role: "user",
              content: `Translate the following text from ${sourceLanguage} to ${targetLanguage}. Return only the translated text, nothing else:\n\n${inputText}`
            }
          ]
        })
      });

      const data = await response.json();
      const translation = data.content.map(item => item.type === "text" ? item.text : "").join("\n");
      setTranslatedText(translation);
    } catch (error) {
      console.error('Translation error:', error);
      alert('Error translating text. Please try again.');
    } finally {
      setIsTranslating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(translatedText);
    alert('Copied to clipboard!');
  };

  const handleDownload = () => {
    const blob = new Blob([translatedText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `translated_${targetLanguage.toLowerCase()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const swapLanguages = () => {
    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguage);
    setInputText(translatedText);
    setTranslatedText(inputText);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Languages className="w-12 h-12 text-indigo-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Multi-Language Translator</h1>
            <p className="text-gray-600">Translate text, PDFs, and images across 120+ languages</p>
          </div>

          {/* Language Selection */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
              <select
                value={sourceLanguage}
                onChange={(e) => setSourceLanguage(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                {LANGUAGES.map(lang => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>

            <div className="flex items-end justify-center">
              <button
                onClick={swapLanguages}
                className="px-4 py-2 bg-indigo-100 text-indigo-600 rounded-lg hover:bg-indigo-200 transition-colors"
              >
                ⇄ Swap
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
              <select
                value={targetLanguage}
                onChange={(e) => setTargetLanguage(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                {LANGUAGES.map(lang => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>
          </div>

          {/* File Upload Section */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Upload File</label>
            <div className="flex flex-wrap gap-3">
              <label className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer transition-colors">
                <FileText className="w-5 h-5 mr-2" />
                Text File (.txt)
                <input
                  type="file"
                  accept=".txt"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
              
              <label className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 cursor-pointer transition-colors">
                <Upload className="w-5 h-5 mr-2" />
                PDF File
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              <label className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 cursor-pointer transition-colors">
                <Image className="w-5 h-5 mr-2" />
                Image (OCR)
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
            {fileName && (
              <p className="text-sm text-gray-600 mt-2">Loaded: {fileName}</p>
            )}
          </div>

          {/* Text Input/Output Area */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Source Text</label>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter text or upload a file..."
                className="w-full h-64 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Translated Text</label>
              <textarea
                value={translatedText}
                readOnly
                placeholder="Translation will appear here..."
                className="w-full h-64 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 resize-none"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={handleTranslate}
              disabled={isTranslating}
              className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-semibold"
            >
              {isTranslating ? 'Processing...' : 'Translate'}
            </button>

            {translatedText && (
              <>
                <button
                  onClick={handleCopy}
                  className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Copy className="w-5 h-5 mr-2" />
                  Copy
                </button>

                <button
                  onClick={handleDownload}
                  className="flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
