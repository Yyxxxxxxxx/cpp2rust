import { useState, useContext, useEffect } from "react";
import "./style.css"
import axios from "axios";
import MonacoEditor from 'react-monaco-editor';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import { translatedCodeContext } from "../App";

const http = axios.create({
    baseURL: "/api",
    timeout: 1000000,
    header: { 'Content-Type': 'application/json' }
})

export default function CodeInput({ language, name, operator, readOnly }) {
    useEffect(() => {
    })
    
    const [code, setCode] = useState('//input code here');
    const { translatedCode, updateTranslatedCode } = useContext(translatedCodeContext);
    const key = 'updatable';

    function editorDidMount(editor, monaco) {
        // console.log('editorDidMount', editor);
        editor.focus();
    }

    function handleChange(e) {
        setCode(e);
    }

    function handleTranslate() {
        message.loading({
            duration: 0,
            key,
            content: "转译中，请稍候"
        })
        http.post('/translate', { code }).then((res) => {
            message.destroy(key);
            const result = res.data;
            if (result == 'error') {
                message.error({
                    key,
                    content: "转译失败",
                })
            } else {
                message.success({
                    key,
                    content: "转译成功"
                })
                updateTranslatedCode(result);
            }
        })
    }

    const uploadProps = {
        name: 'file',
        showUploadList: false,
        beforeUpload: (file, fileList) => {
            const reader = new FileReader();
            reader.readAsText(file);
            reader.onload = () => {
                console.log(reader.result);
                setCode(reader.result);
            };
        },
    };

    const options = {
        selectOnLineNumbers: true,
        readOnly
    };


    return (
        <>
            <div className="header">{name}</div>
            <div className="input">
                <MonacoEditor
                    width="46vw"
                    height="70vh"
                    language={language}
                    theme="vs-dark"
                    onChange={handleChange}
                    value={language == 'rust' ? translatedCode : code}
                    options={options}
                    editorDidMount={editorDidMount}
                />
            </div>
            {
                operator &&
                <div className="operator">
                    <Button type="primary" onClick={handleTranslate}>转译</Button>
                    <Upload {...uploadProps}>
                        <Button icon={<UploadOutlined />}>上传文件</Button>
                    </Upload>
                </div>
            }
        </>
    )
}