import { Popover, PopoverProps, Backdrop, useTheme } from "@material-ui/core";
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
    const theme = useTheme();

    return (
        <Popover
            BackdropComponent={Backdrop}
            BackdropProps={{ style: { zIndex: theme.zIndex.appBar + 1 } }}
            PaperProps={{ style: { zIndex: theme.zIndex.appBar + 2 } }}
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
