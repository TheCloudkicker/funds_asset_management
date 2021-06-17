import React from 'react'
import { Feed } from "semantic-ui-react";

import FeedEvent from './FeedEvent'

function DeliverableFeed({ deliverables }) {
    return (
        <Feed>
            {deliverables.map(deliverable =>

                <FeedEvent key={deliverable.id} deliverable={deliverable} />

            )}



        </Feed>
    )
}

export default DeliverableFeed
