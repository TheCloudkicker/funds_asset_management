import uuidv4 from 'uuid/v4'

const newAttachment = profile => {
    return {
        id: uuidv4(),
        fileObj: null,
        dateCreated: '',
        name: '',
        uploadedBy: profile.displayName,
        url: '',
        isUploaded: false,
        unsaved_changes: true,

    }
}


export const updateRepoState = (repoCopy, payload) => {

    console.log("Updating RepoState", repoCopy, payload)

    if (payload.key === 'add') {
        repoCopy.items[payload.selectedIndex].fields[payload.indexes.fieldIndex].files.push(newAttachment(payload.currentUser))
        if (!repoCopy.items[payload.selectedIndex].fields[payload.indexes.fieldIndex].isOpen) {
            repoCopy.items[payload.selectedIndex].fields[payload.indexes.fieldIndex].isOpen = true
        }
    } else if (payload.key === 'delete') {
        repoCopy.items[payload.selectedIndex].fields[payload.indexes.fieldIndex].files.splice(payload.indexes.fileIndex, 1)
        if (repoCopy.items[payload.selectedIndex].fields[payload.indexes.fieldIndex].files.length === 0) {
            repoCopy.items[payload.selectedIndex].fields[payload.indexes.fieldIndex].isOpen = false
        }
    } else if (payload.key === 'isOpen') {
        if (payload.value === true && repoCopy.items[payload.selectedIndex].fields[payload.indexes.fieldIndex].files.length > 0) {
            repoCopy.items[payload.selectedIndex].fields[payload.indexes.fieldIndex][payload.key] = payload.value
        } else if (payload.value === false) {
            for (var i = 0; i < repoCopy.items[payload.selectedIndex].fields.length; i++) {
                repoCopy.items[payload.selectedIndex].fields[i].isOpen = false
            }
        }
    } else if (payload.key === 'add-attachment') {

        console.log('attachment')
        repoCopy.items[payload.selectedIndex].fields[payload.indexes.fieldIndex].files[payload.indexes.fileIndex].isUploaded = true
        repoCopy.items[payload.selectedIndex].fields[payload.indexes.fieldIndex].files[payload.indexes.fileIndex].name = payload.value.name
        repoCopy.items[payload.selectedIndex].fields[payload.indexes.fieldIndex].files[payload.indexes.fileIndex].fileObj = payload.value

    } else {
        repoCopy.items[payload.selectedIndex].fields[payload.indexes.fieldIndex][payload.key] = payload.value

    }









    return repoCopy
}