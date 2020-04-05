import {
    Button,
    CircularProgress,
    Divider,
    Icon,
    IconButton,
    TextField,
    Tooltip,
} from "@material-ui/core";
import clsx from "clsx";
import { useSnackbar } from "notistack";
import React, { HTMLProps } from "react";
import _ from "lodash";
import { useAdminUserSettings } from "../../../../hooks";
import styles from "./Toolbar.module.scss";

const Toolbar: React.FC<ToolbarProps> = ({
    onRefresh,
    onClearFilter,
    className,
    ...others
}) => {
    const [search, setSearch] = React.useState<string>("");
    const userSettings = useAdminUserSettings();
    const snack = useSnackbar();

    const onSearch = (e?: React.FormEvent) => {
        e?.preventDefault?.();
        userSettings.getUserList({ search });
    };

    const unimplemented = () => {
        snack.enqueueSnackbar("Feature is not implemented", {
            autoHideDuration: 5000,
        });
    };

    const __onClearFilter = () => {
        setSearch("");
        onClearFilter?.();
    };

    return (
        <div className={clsx(styles.toolbar, className)} {...others}>
            <form onSubmit={onSearch}>
                <TextField
                    autoFocus
                    autoComplete="off"
                    className={styles.searchBox}
                    placeholder="Type here to search"
                    variant="outlined"
                    disabled={userSettings.loading}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </form>

            <Tooltip title="Search users">
                <span>
                    <IconButton
                        onClick={onSearch}
                        disabled={userSettings.loading}
                    >
                        <Icon>search</Icon>
                    </IconButton>
                </span>
            </Tooltip>

            <Divider orientation="vertical" flexItem />

            <Tooltip title="Clear filters">
                <span>
                    <IconButton
                        disabled={userSettings.loading}
                        onClick={__onClearFilter}
                    >
                        <Icon>filter_list</Icon>
                    </IconButton>
                </span>
            </Tooltip>

            <Button onClick={unimplemented}>Advanced Filter</Button>

            <span className="spacer"></span>

            {userSettings.loading ? (
                <CircularProgress size={24} />
            ) : (
                <Tooltip title="Refresh">
                    <IconButton onClick={onRefresh}>
                        <Icon>refresh</Icon>
                    </IconButton>
                </Tooltip>
            )}
        </div>
    );
};

export default Toolbar;

export interface ToolbarProps extends HTMLProps<HTMLDivElement> {
    // onFilter: (filter: any) => void;
    onClearFilter: () => void;
    onRefresh: () => void;
}
