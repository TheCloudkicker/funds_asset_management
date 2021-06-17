import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { TableDetailContainer } from '../../assets/styled-components/Containers'
import { Tab, Segment, Icon, Button, Table } from 'semantic-ui-react'
import { deleteRecycleItem, restoreRecyleItem } from '../../store/actions/recycle'

const Recycle = () => {

    const dispatch = useDispatch()
    const { isDark } = useSelector(state => state.settings)
    const recycle = useSelector(state => state.recycle)

    useEffect(() => {
        localStorage.setItem('waibeUrl', '/recyclebin')
    }, [])

    const headers = [
        { id: 1, title: "Deleted Object" },
        { id: 2, title: "Date Deleted" },
        { id: 3, title: "Deleted By" },
        { id: 4, title: "Actions" },
    ]
    const panes = [
        {
            menuItem: 'ABC',
            render: () => <Tab.Pane style={{ minHeight: 'calc(100vh - 9rem)' }} attached='top'></Tab.Pane>
        },
    ]

    const detailHeight = 'calc(100vh - 9rem)'
    const mainHeight = 'calc(100vh - 6.2rem)'

    const onChange = () => { }

    return (
        <TableDetailContainer>

            <Segment loading={recycle.isLoading} style={{ overflowY: 'scroll', maxHeight: mainHeight, padding: 0 }}>
                <Table inverted={isDark.current} celled padded selectable sortable>

                    <Table.Header>
                        <Table.Row>
                            {headers.map(header =>
                                <Table.HeaderCell
                                    style={{ justifyContent: 'flex-start', paddingLeft: '1rem' }}
                                    sorted={'ascending'}
                                    onClick={() => console.log("A")}
                                    key={header.id} >
                                    {header.title}
                                </Table.HeaderCell>
                            )}
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {recycle.recycled_items.map((item, itemIndex) =>
                            <Table.Row error={false} style={{ height: '3rem', cursor: 'pointer' }} key={itemIndex}>
                                <Table.Cell>{item.data.name}</Table.Cell>
                                <Table.Cell>{item.deletedBy}</Table.Cell>
                                <Table.Cell>{item.dateDeleted}</Table.Cell>
                                <Table.Cell>
                                    <Button.Group size='small'>

                                        <Button color='black' icon disabled={false} onClick={() => dispatch(deleteRecycleItem(item))}>
                                            <Icon name={'trash'} />
                                        </Button>

                                        <Button color='black' icon disabled={false} onClick={() => restoreRecyleItem(dispatch, item)}>
                                            <Icon name={'undo'} />
                                        </Button>

                                    </Button.Group>

                                </Table.Cell>
                            </Table.Row>
                        )}
                    </Table.Body>

                </Table>

            </Segment>

            <Tab menu={{ attached: 'bottom' }} panes={panes} />

        </TableDetailContainer>
    )
}

export default Recycle
