
import { useEffect, useRef, useState } from "react";

import io from "socket.io-client";

import axios from "axios";

import addNotification from "react-push-notification";

import "./client.css";

import { Document, Page, pdfjs } from 'react-pdf';
import 'bootstrap/dist/css/bootstrap.min.css';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFReader = () => {




    const { _id } = JSON.parse(localStorage.getItem("user"));
    const [imageMenu, setImageMenu] = useState("");

    useEffect(() => {
        const { imageMenu } = JSON.parse(localStorage.getItem("user"));

        setImageMenu(imageMenu ? `${imageMenu}` : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQYV2NgAAIAAAUAAarVyFEAAAAASUVORK5CYII=");
    }, []);




    const [beep, setBeep] = useState(null);
    const [showBepp, setShowBepp] = useState(false);
    const [beepToken, setBeepToken] = useState(
        localStorage.getItem("beepToken") || null
    );
    const socketRef = useRef();

    window.OneSignal = window.OneSignal || [];
    const OneSignal = window.OneSignal;
    useEffect(() => {
        OneSignal.push(function () {
            OneSignal.init({
                appId: "0426b732-d4b7-47ed-9e66-48e7350b1749",
                safari_web_id:
                    "web.onesignal.auto.3b9e77c1-5852-4edd-a278-c29c156a72b0",
                notifyButton: {
                    enable: true,
                },
                welcomeNotification: {
                    title: "One Signal",
                    message: "Thanks for subscribing!",
                },
            });
        });
    }, []);
    useEffect(() => {
        fetchData();

        if (socketRef.current) socketRef.current.offAny();
        if (!beepToken) {
            return;
        }
        socketRef.current = io("/");
        socketRef.current.emit("auth", { beepToken });
        socketRef.current.on("auth", (data) => {
            if (!data.success) {
                (() => setBeepToken(null))();
                localStorage.removeItem("beepToken");
            } else {
                setBeep(data.beep);
                setShowBepp(true);
            }
        });
        socketRef.current.on("getUpdate", (data) => {
            const { beep, change } = data;
            switch (change) {
                case "delete":
                    localStorage.removeItem("beepToken");
                    setBeep(null);
                    setBeepToken(null);
                    setShowBepp(false);
                    break;
                case "call":
                    console.log("test");
                    setBeep(beep);

                    break;
                default:
                    setBeep(beep);
                    break;
            }
        });
    }, [beepToken]);

    const fetchData = async () => {
        await axios({
            url: `/api/restaurant/${_id}`,
            method: "GET",
            headers: { "Content-Type": "application/json" },
        }).then(async (res) => {
            if (res.data) {
                setImageMenu(res.data.data[0].imageMenu);
            }
        });
    };


    const [scale, setScale] = useState(1.0);
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setIsLoading(false);
    }
//console.log(JSON. stringify(imageMenu), "i am heeeeeeeeeere" );
    return (
        <div className="beep-client-container2">

            <section
                id="pdf-section"
                className="beep-client-container2"
            >

                <Document
                    file={'/api/restaurant/servepdf/'+imageMenu}
                    onLoadSuccess={onDocumentLoadSuccess}
                >
                    <Page pageNumber={pageNumber} scale={scale} />
                </Document>
            </section>

        </div>
    );
};

export default PDFReader;
