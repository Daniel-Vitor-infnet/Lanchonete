import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import stylesPerso from "@/styles/pageLayout/Header.module.scss";
import { iconsSelect } from "@/utils/function";


interface Page {
    to: string;
    label: string;
}

interface MobileMenuProps {
    pages: Page[];
    logado: boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ pages, logado }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMenuItemClick = (to: string) => {
        navigate(to);
        handleClose();
    };

    return (
        <div >
            <Button
                id="mobile-menu-button"
                onClick={handleOpen}
                // startIcon={iconsSelect("mui-geral-Menu", 1.0, null)}
                style={{ color: "#000000", fontWeight: "bold", margin: "0px 8px" }}
            >
                Menu
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                disableScrollLock
                slotProps={{
                    list: {
                        'aria-labelledby': 'mobile-menu-button',
                    },
                }}
            >

                {pages
                    .filter(page => {
                        if (logado && page.to === "/Login") return false;
                        if (!logado && page.to === "/Perfil") return false;
                        if (page.to === location.pathname) return false;
                        return true;
                    })
                    .map(page => (
                        <MenuItem key={page.to} onClick={() => handleMenuItemClick(page.to)}>
                            {page.label}
                        </MenuItem>
                    ))
                }




            </Menu>
        </div>
    );
};

export default MobileMenu;
