import React from 'react'
import { Editor } from '@tinymce/tinymce-react'


class MarkDown extends React.Component {
    handleEditorChange = (e) => {
    	console.log('Content was updated:', e.target.getContent())
    }

    render() {
    	return (
    		<Editor apiKey='emp0qcgbf38ojnoq053z8g4vgioofot6milb2995lupn8mue' cloudChannel='dev' init={{
    			selector: 'textarea',
    			plugins: 'image code',
    			toolbar: 'undo redo | image code',

    			images_upload_handler: function (blobInfo, success, failure) {
    				var xhr, formData

    				xhr = new XMLHttpRequest()
    				xhr.withCredentials = false
    				xhr.open('POST', '@Url.Action("UploadImage", "Recipe")')

    				xhr.onload = function () {
    					var json

    					if (xhr.status != 200) {
    						failure('HTTP Error: ' + xhr.status)

    						return
    					}

    					json = xhr.responseText

    					success(json)

    				}

    				formData = new FormData()
    				formData.append('file', blobInfo.blob(), blobInfo.filename())

    				xhr.send(formData)
    			}
    		}} />

    	)
    }
}

export default MarkDown