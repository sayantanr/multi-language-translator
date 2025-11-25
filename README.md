# Multi-Language Translator with OCR

A powerful, AI-powered translation application that supports 120+ languages with built-in OCR capabilities for PDFs and images.



## ✨ Features

- 🌍 **120+ Languages Support** - Translate between over 120 languages including major world languages and regional dialects
- 📄 **PDF Text Extraction** - Upload PDF documents and extract text automatically
- 🖼️ **Image OCR** - Extract text from images (JPG, PNG, JPEG, etc.)
- 📝 **Text File Support** - Upload .txt files directly
- ⇄ **Language Swap** - Quickly swap source and target languages
- 📋 **Copy to Clipboard** - One-click copy of translated text
- 💾 **Download Translations** - Save translations as .txt files
- 🎨 **Modern UI** - Clean, responsive interface with intuitive controls
- ⚡ **Real-time Processing** - Fast AI-powered translations and OCR

## 🌐 Supported Languages

The app supports translation between any pair of the following 120+ languages:

Afrikaans, Albanian, Amharic, Arabic, Armenian, Assamese, Aymara, Azerbaijani, Bambara, Basque, Belarusian, Bengali, Bhojpuri, Bosnian, Bulgarian, Burmese, Catalan, Cebuano, Chinese (Simplified), Chinese (Traditional), Corsican, Croatian, Czech, Danish, Dhivehi, Dogri, Dutch, English, Esperanto, Estonian, Ewe, Filipino (Tagalog), Finnish, French, Frisian, Galician, Georgian, German, Greek, Guarani, Gujarati, Haitian Creole, Hausa, Hawaiian, Hebrew, Hindi, Hmong, Hungarian, Icelandic, Igbo, Ilocano, Indonesian, Irish, Italian, Japanese, Javanese, Kannada, Kazakh, Khmer, Kinyarwanda, Konkani, Korean, Krio, Kurdish (Kurmanji), Kurdish (Sorani), Kyrgyz, Lao, Latin, Latvian, Lingala, Lithuanian, Luganda, Luxembourgish, Macedonian, Maithili, Malagasy, Malay, Malayalam, Maltese, Maori, Marathi, Meiteilon (Manipuri), Mizo, Mongolian, Nepali, Norwegian, Odia (Oriya), Oromo, Pashto, Persian (Farsi), Polish, Portuguese, Punjabi, Quechua, Romanian, Russian, Samoan, Sanskrit, Scottish Gaelic, Sepedi, Serbian, Sesotho, Shona, Sindhi, Sinhala, Slovak, Slovenian, Somali, Spanish, Sundanese, Swahili, Swedish, Tajik, Tamil, Tatar, Telugu, Thai, Tigrinya, Tsonga, Turkish, Turkmen, Twi, Ukrainian, Urdu, Uyghur, Uzbek, Vietnamese, Welsh, Xhosa, Yiddish, Yoruba, and Zulu.

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ installed
- React 18+
- Modern web browser

### Installation

1. Clone the repository:
```bash
git clone https://github.com/sayantanr/multi-language-translator.git
cd multilanguage-translator
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:3000`

## 📖 How to Use

### Basic Translation

1. **Select Languages**: Choose your source and target languages from the dropdown menus
2. **Enter Text**: Type or paste text into the "Source Text" area
3. **Translate**: Click the "Translate" button
4. **Get Results**: View your translation in the "Translated Text" area

### Upload Files

#### Text Files (.txt)
- Click the "Text File (.txt)" button
- Select your .txt file
- Text will automatically populate in the source area

#### PDF Files
- Click the "PDF File" button
- Select your PDF document
- AI will extract all text from the PDF
- Extracted text appears in the source area

#### Images (OCR)
- Click the "Image (OCR)" button
- Select an image file (JPG, PNG, etc.)
- AI will perform OCR and extract visible text
- Extracted text appears in the source area

### Additional Features

- **Swap Languages**: Click the "⇄ Swap" button to quickly reverse source and target languages
- **Copy Translation**: Click the "Copy" button to copy translated text to clipboard
- **Download Translation**: Click the "Download" button to save translation as a .txt file

## 🛠️ Technical Details

### Built With

- **React** - Frontend framework
- **Lucide React** - Icons
- **Tailwind CSS** - Styling
- **Claude AI (Anthropic)** - Translation and OCR engine

### Architecture

The app uses Claude AI's API to perform:
- Text-to-text translation
- PDF text extraction
- OCR from images
- Language detection

## 📝 File Format Support

| Format | Extension | Support |
|--------|-----------|---------|
| Text | .txt | ✅ Full |
| PDF | .pdf | ✅ Full |
| Images | .jpg, .jpeg, .png, .gif, .bmp | ✅ OCR |

## ⚙️ Configuration

### API Setup

The app requires access to the Anthropic API. The API endpoint is configured to use:
- Model: `claude-sonnet-4-20250514`
- Max tokens: 1000 per request

## 🎯 Use Cases

- **Travel**: Translate signs, menus, and documents while traveling
- **Business**: Translate business documents and communications
- **Education**: Study materials in multiple languages
- **Research**: Translate research papers and articles
- **Content Creation**: Localize content for global audiences
- **Document Processing**: Extract and translate text from scanned documents

## 🔒 Privacy & Security

- All processing happens through secure API calls
- No text data is stored permanently
- Files are processed in-memory only
- No user data retention

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🐛 Known Issues

- Large PDF files (>10MB) may take longer to process
- Complex image layouts may affect OCR accuracy
- Very long texts may need to be processed in chunks

## 🗺️ Roadmap

- [ ] Add bulk file translation
- [ ] Support for audio file transcription and translation
- [ ] Translation history and favorites
- [ ] Offline mode for common languages
- [ ] Browser extension version
- [ ] Mobile app version

## 💬 Support

For support, please open an issue in the GitHub repository or contact the maintainers.

## 🙏 Acknowledgments

- Anthropic for Claude AI
- Lucide for beautiful icons
- The open-source community

## 📊 Stats

- **Languages**: 120+
- **File Types**: 3 (Text, PDF, Images)
- **Translation Pairs**: 14,400+
- **AI Model**: Claude Sonnet 4

---

Made with ❤️ by the community
