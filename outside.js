import React, { useRef } from "react";

import React from "react";

function Outside() {
	const ref = useRef();

	function useOutsideAlerter(ref) {
		useEffect(() => {
			function handleClickOutside(event) {
				if (ref.current && !ref.current.contains(event.target)) {
					setOpen(false);
				}
			}
			document.addEventListener("mousedown", handleClickOutside);
			return () => {
				document.removeEventListener("mousedown", handleClickOutside);
			};
		}, [ref]);
	}

	useOutsideAlerter(ref);
	return <div ref={ref}>Dropdown</div>;
}

export default Outside;
