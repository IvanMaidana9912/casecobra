'use client';

import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Image, Loader2, MousePointerSquareDashed } from "lucide-react";
import { useState, useTransition } from "react";
import Dropzone, {FileRejection} from "react-dropzone";

const Page = () => {
    const [isDragOver, setIsDragOver] = useState<boolean>(false);
    const [uploadProgress, setUploadProgress] = useState<number>(90);
    const onDropRejected = () => {};
    const onDropAccepted = () => {};

    const isUploading = true;
    const [isPending, startTransition] = useTransition();

    return (
        <div className={cn("relative h-full flex-1 my-16 w-full rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl flex justify-center flex-col items-center", {
            "ring-blue-900/25 bg-blue-900/10": isDragOver, })}>
                <div className="relative flex flex-1 flex-col items-center justify-center w-full">
                    <Dropzone onDropRejected={onDropRejected} onDropAccepted={onDropAccepted} accept={{
                        "image/png": [".png"],
                        "image/jpeg": [".jpeg"],
                        "image/jpg": [".jpg"]
                    }} onDragEnter={() => setIsDragOver(true)} onDragLeave={() => setIsDragOver(false)}>
                        {
                            ({getRootProps, getInputProps}) => (
                                <div className="h-full w-full flex flex-1 flex-col items-center justify-center" {...getRootProps()}>
                                    <input {...getInputProps()} /> 
                                    {
                                        isDragOver ? (
                                            <MousePointerSquareDashed className="h-6 w-6 text-zinc-500 mb-2" />
                                        ) : isUploading || isPending ? (
                                            <Loader2 className="animate-spin h-6 w-6 texttext-zinc-500 mb-2" />
                                        ) : (
                                            <Image className="h-6 w-6 text-zinc-500 m-2" />
                                        )
                                    }
                                    <div className="flex flex-col justify-center text-center mb-2 text-sm text-zinc-700">
                                        {
                                            isUploading ? <div className="flex flex-col items-center">
                                                <p>Uploading...</p>
                                                <Progress value={uploadProgress} className="mt-2 w-40 h-2 bg-gray-300"  />
                                            </div> : isPending ? <div></div> : isDragOver ? <span></span> : <span></span>
                                        }
                                    </div>
                                </div>
                            )
                        }
                    </Dropzone>
                </div>

        </div>
    )
}

export default Page;