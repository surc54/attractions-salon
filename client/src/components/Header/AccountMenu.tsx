import { Popover, PopoverProps } from "@material-ui/core";
import React from "react";
import Login from "../../views/Login/Login";

const AccountMenu: React.FC<AccountMenuProps> = ({
    onClose,
    open,
    ...others
}) => {
    const onMenuItemClick = () => {
        onClose();
    };

    return (
        <Popover
            {...others}
            open={
                open === undefined || open === null ? !!others.anchorEl : open
            }
            onClose={onClose}
        >
            <Login keepNavBar modalMode closeModal={() => onClose()} />
        </Popover>
    );
};

interface AccountMenuProps extends PopoverProps {
    onClose: () => void;
}

export default AccountMenu;
