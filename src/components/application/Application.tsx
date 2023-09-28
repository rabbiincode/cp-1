import React, {useState} from 'react'
import { Checkbox, Select, Space, Switch } from 'antd';
import './_application.css'

const Application = () => {
  const [createQuestion, setCreateQuestion] = useState<[]>([])
  const [imageUrl, setImageUrl] = useState<string>('')
  const [imageName, setImageName] = useState<string>('')
  const [selectedFile, setSelectedFile] = useState(null)

  interface Info {
    title: String;
  }

  const infos: Info[] = [
    {
      title: ''
    },
    {
      title: 'Nationality'
    },
    {
      title: 'Current Residence'
    },
    {
      title: 'ID Number'
    },
    {
      title: 'Date of Birth'
    },
    {
      title: 'Gender'
    }
  ]
  const profile: Info[] = [
    {
      title: 'Education'
    },
    {
      title: 'Experience'
    },
    {
      title: 'Resume'
    }
  ]

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    setSelectedFile(file)
    setImageName(file.name)
    // Generate a URL for the selected image file
    const fileUrl = URL.createObjectURL(file)
    setImageUrl(fileUrl)
  }

  const handleDelete = () => {
    setSelectedFile(null)
    setImageUrl('')
    setImageName('')
  }

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  }

  const handleCreateQuestion = () => {
    const newQuestion = 
    <div key={createQuestion.length} className="new-question box-1">
      <div className='heading'>Questions</div>
      <div className='content'>
      <div className='create-question'>
        <label for="groupSize">Type</label>
        <Select
          defaultValue="Paragraph"
          onChange={handleChange}
          options={[
            { value: 'Paragraph', label: 'Paragraph' },
            { value: 'Short answer', label: 'Short answer' },
            { value: 'Yes/No', label: 'Yes/No' },
            { value: 'Dropdown', label: 'Dropdown' },
            { value: 'Multiple choice', label: 'Multiple choice' },
            { value: 'Date', label: 'Date' },
            { value: 'Number', label: 'Number' },
            { value: 'file-upload', label: 'file-upload' },
            { value: 'video-question', label: 'video-question' },
          ]}
        />
      </div>
      <div className='create-question'>
        <label for="groupSize">Question</label>
        <input type="text" placeholder='Type here' id="question" value=''/>
      </div>
      <div className='delete'>
        <span>
          <img src='/images/close.png' alt='img'/>
          Delete Question
        </span>
        <button>Save</button>
      </div>
      </div>
    </div>
    setCreateQuestion([...createQuestion, newQuestion])
  }

  return (
    <div className='application'>
      <div className='body'>
        <div className='box-1' style={{ backgroundImage: `url(${imageUrl})`, backgroundRepeat: 'no-repeat', backgroundSize: 'contain' }}>
          <div className={`heading ${imageName && 'transparent'}`}>
            Upload cover image
          </div>
          <div className='pics'>
            <div className='upload'>
              <input type="file" accept="image/*" required onChange={handleFileChange}/>
              <img src='/images/upload.png' alt='img'/>
            </div>
            <span className='cover'>Upload cover image</span>
            <span className='ratio'>16:9 ratio is recommended. Max image size 1mb</span>
            {imageName}
          </div>
          {
            imageName &&
            <div className='remove'>
              <button onClick={handleDelete}>
                <img src='/images/close.png' alt='img'/>
                Delete & re-upload
              </button>
            </div>
          }
        </div>
        <div className='box-1'>
          <div className='heading'>
            Personal Information
          </div>
          <div className='form'>
            <form>
              <input placeholder='First Name'  type='text' id="firstName" required/>
              <input placeholder='Last Name' type='text' id="lastName" required/>
              <input placeholder='Email Name' type='email' id="email" required/>
              <input placeholder='Phone' type='text' id="phone" required/>
            </form>
            {
              infos.map((info) => (
                <div className='row-1'>
                  <span className='title-1'>{info.title}</span>
                  <span className='switch'>
                    <span><Checkbox/> Internal</span>
                    <span><Switch defaultChecked/> Hide</span>
                  </span>
                </div>
              ))
            }
            <div className='question'>
              <img src='/images/add.png' alt='img' onClick={handleCreateQuestion}/>
              <span>Add a question</span>
            </div>
          </div>
        </div>

        <div className='box-1'>
          <div className='heading'>
            Profile
          </div>
          <div className='form'>
            {
              profile.map((info) => (
                <div className='row-1'>
                  <span className='title-1'>{info.title}</span>
                  <span className='switch'>
                    <span><Checkbox/> Mandatory</span>
                    <span><Switch defaultChecked/> Hide</span>
                  </span>
                </div>
              ))
            }
            <div className='question'>
              <img src='/images/add.png' alt='img' onClick={handleCreateQuestion}/>
              <span>Add a question</span>
            </div>
          </div>
        </div>
        <div className='box-1'>
          <div className='heading'>
            Additional questions
          </div>
          <div className='form'>
            <form className='form-1'>
              <div className='question-1'>
                <label>Paragraph</label>
                <span>
                  Please tell me about yourself in less than 500 words
                  <img src='/images/img.png' alt='img'/>
                </span>
                {/* <textarea placeholder=''  type='text' required/> */}
              </div>

              <div className='question-1'>
                <label>Dropdown</label>
                <span>
                  Please select the year of graduation from the list below
                  <img src='/images/img.png' alt='img'/>
                </span>
                {/* <textarea placeholder=''  type='text' required/> */}
              </div>

              <div className='question-2'>
                <span>Question</span>
                <input placeholder='Type here' type='text'/>
              </div>

              <div className='question-2 question-3'>
                <span className='choice'>Choice</span>
                <span className='image'>
                  <img src='/images/list.png' alt='img' className='img-3'/>
                  <input placeholder='Type here' type='text'/>
                  <img src='/images/add.png' alt='img' className='add-3'/>
                </span>
              </div>

              <div className='delete'>
                <span>
                  <img src='/images/close.png' alt='img'/>
                  Delete Question
                </span>
                <button>Save</button>
              </div>

              <div className='question-1'>
                <label>Yes/No questions</label>
                <span>
                  Have you ever been rejected by the UK embassy?
                  <img src='/images/img.png' alt='img'/>
                </span>
                {/* <textarea placeholder=''  type='text' required/> */}
              </div>
            </form>
            <div className='question'>
              <img src='/images/add.png' alt='img' onClick={handleCreateQuestion}/>
              <span>Add a question</span>
            </div>
          </div>
        {createQuestion}
        </div>
      </div>
    </div>
  )
}

export default Application