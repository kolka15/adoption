import React from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import Editor from '../../static/ckeditor5/build/ckeditor';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import FontColor from '@ckeditor/ckeditor5-font/src/fontcolor'

import Button from '../../reusable/Button';

const CKEditorComponent = () => {
    const config = {
        toolbar: {
            items: [
                'heading',
                '|',
                'bold',
                'italic',
                'link',
                'bulletedList',
                'numberedList',
                '|',
                'indent',
                'outdent',
                '|',
                'blockQuote',
                'underline',
                'fontColor',
                'fontBackgroundColor',
                'fontSize',
                'insertTable',
                'undo',
                'redo'
            ]
        },
        language: 'ru',
        table: {
            contentToolbar: [
                'tableColumn',
                'tableRow',
                'mergeTableCells'
            ]
        },
    };
    return (
        <>
            <CKEditor
                editor={Editor}
                config={config}
                height={450}
                // data="<p>Hello from CKEditor 5!</p>"
                onInit={editor => {
                    // You can store the "editor" and use when it is needed.
                    console.log('Editor is ready to use!', editor);
                }}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    console.log({event, editor, data});
                }}
                onBlur={(event, editor) => {
                    console.log('Blur.', editor);
                }}
                onFocus={(event, editor) => {
                    console.log('Focus.', editor);
                }}
            />
            <div className='btns-row'>
                <div className='btn-wrapper'>
                    <Button text='Сохранить'/>
                </div>
                <div className='btn-wrapper'>
                    <Button text='Отменить' bgColor='#007bff'/>
                </div>
            
            </div>
            <style jsx>{`
                .btns-row {
                    display:flex;
                    justify-content:center;
                    margin: 40px 0 60px;
                }
                .btn-wrapper {
                    margin: 0 15px;
                }
            `}</style>
            <style jsx global>{`
              .ck-editor__editable_inline {
                min-height: 450px;
              }
              
               ul, ol {
                    display: block;
                    list-style: disc outside none;
                    margin: 1em 0;
                    padding: 0 0 0 40px;
                }
                ol li{
                    list-style: decimal;
                }
                ul li {
                    display: list-item;
                    list-style: disc;
                }
                ul ul, ol ul {
                    list-style-type: circle;
                    margin-left: 15px;
                }
                ol ol, ul ol {
                    list-style-type: lower-latin;
                    margin-left: 15px;
                }
              
            `}</style>
        </>
    );
};

export default CKEditorComponent;
