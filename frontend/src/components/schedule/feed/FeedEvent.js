import React from 'react'
import { Feed } from "semantic-ui-react";

function FeedEvent({ deliverable }) {
    return (
        <Feed.Event style={{ padding: '1rem' }}>
            <Feed.Content>
                <Feed.Summary>
                    <Feed.User>{deliverable.title}</Feed.User>
                    <Feed.Date> {deliverable.date}</Feed.Date>
                    <Feed.Like>
                        {deliverable.status}
                    </Feed.Like>
                </Feed.Summary>

            </Feed.Content>
        </Feed.Event>
    )
}

export default FeedEvent
