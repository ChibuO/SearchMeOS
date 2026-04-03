import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import { CiTextAlignLeft } from "react-icons/ci";
import { MdKeyboardBackspace } from "react-icons/md";
import documents from '../Resources/docsData.json';
import { documentMap } from '../Resources/documentMap.js';
import './Documents.css';

export const DocumentsApp = forwardRef((props, ref) => {
    const [selectedDocumentIndex, setSelectedDocumentIndex] = useState(0);
    const [showDocument, setShowDocument] = useState(false);
    const [fileName, setFileName] = useState('');
    const [documentContent, setDocumentContent] = useState('');

    useImperativeHandle(ref, () => {
        return {
            clearWindow() {
                setSelectedDocumentIndex(0);
                setShowDocument(false);
                setDocumentContent('');
                setFileName('');
            }
        };
    }, []);

    useEffect(() => {
        if (!fileName) {
            return;
        }
        const fullPath = documentMap[fileName];
        fetch(fullPath).then(response => response.text()).then(text => setDocumentContent(text));
    }, [fileName]);

    const openDocument = (index) => {
        setFileName(documents[index]?.file || '');
        setSelectedDocumentIndex(index);
        setShowDocument(true);
    }

    return (
        <div className='docs-container-outer'>
            {showDocument ?
                <DocumentModal 
                    setShowDocument={setShowDocument} 
                    doc={documents[selectedDocumentIndex]} 
                    documentContent={documentContent}
                    setDocumentContent={setDocumentContent} /> :
                <DocumentsHome openDocument={openDocument} />}
        </div>
    )
});

const DocumentsHome = ({ openDocument }) => {
    return (
        <div className='docs-container'>
            <div className='docs-header-div'>
                <h1 id='docs-header'>DOCUMENTS</h1>
            </div>
            <div className='docs-list-div'>
                {documents && documents.map((doc, index) => (
                    <div key={index} className='docs-item' onClick={() => openDocument(index)}>
                        <p className='docs-name'>
                            <CiTextAlignLeft id="docs-icon" />
                            {doc.documentName}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

const DocumentModal = ({ doc, documentContent, setShowDocument, setDocumentContent }) => {
    const onClose = () => {
        console.log('Closing document modal');
        setShowDocument(false);
        setDocumentContent('');
    }

    return (
        <div className='document-outer-div'>
            <div className='document-header'>
                <MdKeyboardBackspace id="document-back-icon" onClick={onClose} />
                <h4 className='document-title'>{doc?.documentName}</h4>
            </div>
            <div className='document-inner-div'>
                <div className='document-doc'>
                    <p id="document-text">{documentContent}</p>
                </div>
            </div>
        </div>
    );
}