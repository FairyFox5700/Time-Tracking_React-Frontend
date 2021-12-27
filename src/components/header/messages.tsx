import { IconButton } from '@material-ui/core'
import Badge from '@material-ui/core/Badge'
import MailIcon from '@material-ui/icons/Mail'
import React from 'react'

const Messages= () => {
    return (
        <IconButton aria-label="show 4 new mails" color="inherit">
            <Badge badgeContent={4} color="secondary">
                <MailIcon />
            </Badge>
        </IconButton>
    )
}
export default Messages;
