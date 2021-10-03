import React from 'react'
import { useSelector } from 'react-redux'
import './index.scss';

export const Header = () => {
    const api = useSelector((state) => state.api);
    const method = useSelector((state) => state.method);
    const path = useSelector((state) => state.path);

    return (
        <header>
            <h1>
                <span>{method}</span> {path}
            </h1>
            <p>{`All APIs > ${api} > ${path}`}</p>
        </header>
    )
}

export default Header;
