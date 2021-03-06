import React from "react";
import clsx from 'clsx';

import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import { Drawer, IconButton } from "@material-ui/core";

import { useStoreState, useStoreActions } from "hooks";

import { Toolbar } from "components";
import FollowedChannelsList from "./FollowedChannelsList";
import RecommandedChannelsList from "./RecommandedChannelsList";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
            whiteSpace: 'nowrap',
        },
        drawerPaper: {
            width: drawerWidth,
            overflowX: 'hidden',
            marginTop: '64px'
        },
        drawerOpen: {
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        drawerClose: {
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            overflowX: 'hidden',
            width: theme.spacing(7) + 1,
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing(9) + 1,
            },
        },
    }),
)

const LeftSidebar = () => {
    const classes = useStyles()

    const isOpen = useStoreState(state => state.globalState.leftSidebarIsOpen)
    const closeSidebar = useStoreActions(actions => actions.globalState.closeLeftSidebar)
    const openSidebar = useStoreActions(actions => actions.globalState.openLeftSidebar)

    return (
        <Drawer
            className={clsx(classes.drawer, {
                [classes.drawerOpen]: isOpen,
                [classes.drawerClose]: !isOpen,
            })}
            classes={{
                paper: clsx({
                    [classes.drawerPaper]: true,
                    [classes.drawerOpen]: isOpen,
                    [classes.drawerClose]: !isOpen,
                }),
            }}
            variant="permanent"
            anchor="left">


            <Toolbar
                before={isOpen ? 'CHAINES SUIVIES' : ''}
                after={
                    isOpen ?
                        <IconButton onClick={() => closeSidebar()}>
                            <ChevronLeftIcon />
                        </IconButton> : <IconButton onClick={() => openSidebar()}>
                            <ChevronRightIcon />
                        </IconButton>}
            />

            <FollowedChannelsList />

            <RecommandedChannelsList />
        </Drawer>)
}

export default LeftSidebar;