import React from "react";
import axios from "axios";

let imageCache: {
    status: null | "downloading" | "ready" | "error";
    blobURI?: string;
    promise?: Promise<string>;
} = {
    status: null,
};

const getImageURI = (): Promise<string> => {
    if (imageCache.status === "ready") {
        return new Promise<string>((resolve, reject) =>
            resolve(imageCache.blobURI)
        );
    } else if (imageCache.status === "downloading") {
        return imageCache.promise as Promise<string>;
    } else {
        imageCache.status = "downloading";
        imageCache.promise = new Promise((resolve, reject) => {
            axios
                .get("/login-background.png", {
                    responseType: "blob",
                })
                .then(response => {
                    const uri = URL.createObjectURL(response.data);
                    imageCache.blobURI = uri;
                    imageCache.status = "ready";
                    setTimeout(() => resolve(uri), 500);
                })
                .catch(err => {
                    imageCache.status = "error";
                    reject(err);
                });
        });
        return imageCache.promise;
    }
};

const LayeredBackground: React.FunctionComponent<LayeredBackgroundProps> = ({
    children,
}) => {
    const [bgImage, setBgImage] = React.useState<string | null>(null);
    React.useEffect(() => {
        getImageURI().then(str => setBgImage(str));
    }, []);

    return (
        <div
            style={{
                height: "100%",
                backgroundSize: "cover",
                ...(!bgImage
                    ? {
                          backgroundColor: "transparent",
                      }
                    : {
                          backgroundImage: `url(${bgImage})`,
                          backgroundRepeat: "no-repeat",
                          backgroundPositionX: "center",
                          backgroundPositionY: "center",
                      }),
            }}
        >
            <div
                style={{
                    height: "100%",
                    background: !bgImage ? "#f7dfe3" : "transparent",
                    transition: "background 0.25s",
                    transitionDelay: "500ms",
                }}
            >
                {children}
            </div>
        </div>
    );
};

export interface LayeredBackgroundProps {
    children: any;
}

export default LayeredBackground;
