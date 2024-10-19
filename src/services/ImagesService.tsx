import {getDownloadURL, listAll} from "firebase/storage";

export const getFilesFromFireBaseStore = (imageListRef:any,setImageList:any,imageList:any) => {
    listAll(imageListRef).then((response) => {
        const urlsToAdd = response.items.map((item) => getDownloadURL(item));
        Promise.all(urlsToAdd).then((urls) => {
            const uniqueUrls = [...new Set([...imageList, ...urls])];
            setImageList(uniqueUrls);
        });
    });
}
