import React from "react"

import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

import { Drawer, IconButton } from "@material-ui/core";

import { useStoreState, useStoreActions } from "hooks";

import Toolbar from "./Toolbar"

const drawerWidth = 340;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            zIndex: 1
        },
        appBar: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginRight: drawerWidth,
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
            overflowX: 'hidden'
        },
        drawerPaper: {
            width: drawerWidth,
            overflowX: 'hidden'
        },
        // necessary for content to be below app bar
        toolbar: theme.mixins.toolbar,
        content: {
            flexGrow: 1,
            backgroundColor: theme.palette.background.default,
            padding: theme.spacing(3),
        },
    }),
)

const StreamsListSidebar = () => {
    const classes = useStyles()

    const isOpen = useStoreState(state => state.global.streamSidebarIsOpen)
    const closeSidebar = useStoreActions(actions => actions.global.closeStreamSidebar)

    return (
        <Drawer
            open={isOpen}
            className={classes.drawer}
            classes={{
                root: classes.root,
                paper: classes.drawerPaper,
            }}
            variant="persistent"
            anchor="left">

            <Toolbar before={'left'} after={<IconButton onClick={() => closeSidebar()}>
                <ChevronLeftIcon />
            </IconButton>} />

        </Drawer>)
}

export default StreamsListSidebar;