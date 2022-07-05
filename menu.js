import { useCallback, useContext, useEffect, useState } from "react";

import { StateContext } from "../../api/context";

const useContextMenu = (props) => {
	const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
	const [show, setShow] = useState(false);
	const [appState, dispatch] = useContext(StateContext);

	const handleContextMenu = useCallback(
		(event) => {
			if (event.target.draggable) {
				event.preventDefault();
				dispatch({ type: "RIGHTCLICK", value: JSON.parse(event?.target?.id) });
				setAnchorPoint({ x: event.pageX, y: event.pageY });
				setShow(true);
			} else return;
		},
		[dispatch]
	);

	const handleClick = useCallback(() => show && setShow(false), [show]);

	useEffect(() => {
		document.addEventListener("click", handleClick);
		document.addEventListener("contextmenu", handleContextMenu);
		return () => {
			document.removeEventListener("click", handleClick);
			document.removeEventListener("contextmenu", handleContextMenu);
		};
	});

	return { anchorPoint, show };
};

export default useContextMenu;
