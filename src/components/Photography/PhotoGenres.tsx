import {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {ref, listAll} from "firebase/storage";
import {storage} from "../../firebase";
import "./../../css/imageGallery.css"

interface photoGenresProps {
	category:string
    setCategory: Dispatch<SetStateAction<string>>
}

export function PhotoGenres(props: photoGenresProps) {
    const [subfolders, setSubfolders] = useState<string[]>([]);

	useEffect(() => {
		fetchSubfolders();
	}, []);

	const fetchSubfolders = async () => {
		const storageRef = ref(storage, 'images');
		const result = await listAll(storageRef);
		const subfolderNames = result.prefixes.map((prefix) =>
			prefix.name.replace('images/', '')
		);
		setSubfolders(subfolderNames);
	};
	
    return (
		<>
			<h2 className="subTitle">Photography</h2>
			<div className="photoGenresBlock">
				{subfolders.map((subfolder, i) => (
					subfolder !== "Banner" && (
						<button
							key={i}
							className={`photoGenresBtn ${props.category === subfolder ? 'selected' : ''}`}
							style={{ width: "325px" }}
							onClick={() => props.setCategory(subfolder)}
						>
							{subfolder}
						</button>
					)
				))}
			</div>
		</>
	);	
}
