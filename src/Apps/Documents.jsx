import React, { Fragment, useState, forwardRef, useImperativeHandle } from 'react';
import { CiTextAlignLeft } from "react-icons/ci";
import { MdKeyboardBackspace } from "react-icons/md";
import documents from '../Resources/docsData.json';
import './Documents.css';

export const DocumentsApp = forwardRef((props, ref) => {
    const [selectedDocumentIndex, setSelectedDocumentIndex] = useState(0);
    const [showDocument, setShowDocument] = useState(false);

    useImperativeHandle(ref, () => {
        return {
            clearWindow() {
                setSelectedDocumentIndex(0);
                setShowDocument(false);
            }
        };
    }, []);

    return (
        <div className='docs-container'>
            {showDocument ?
                <DocumentModal setShowDocument={setShowDocument} doc={documents[selectedDocumentIndex]} index={selectedDocumentIndex} /> :
                <DocumentsHome setSelectedDocumentIndex={setSelectedDocumentIndex} setShowDocument={setShowDocument} />}
        </div>
    )
});

const DocumentsHome = ({ setShowDocument, setSelectedDocumentIndex }) => {
    const openDocument = (index) => {
        setSelectedDocumentIndex(index);
        setShowDocument(true);
    }

    return (
        <div className='docs-container'>
            <div className='docs-header'>
                <h3>Recent Documents</h3>
            </div>
            <div className='docs-list'>
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

const DocumentModal = ({ doc, index, setShowDocument }) => {
    return (
        <div className='document-outer-div'>
            <div className='document-header'>
                <MdKeyboardBackspace id="document-back-icon" onClick={() => setShowDocument(false)} />
                <h4 className='document-title'>{doc?.documentName}</h4>
            </div>
            <div className='document-inner-div'>
                <div className='document-doc' id={`page-${index}`}>
                    {doc && doc.textContent.map((text, index) => (
                        <Fragment key={index}>
                            <p>{text}</p>
                            {index !== doc.textContent.length - 1 && <br />}
                        </Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
}