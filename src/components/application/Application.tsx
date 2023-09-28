import React, {useEffect, useState} from 'react'
import { Checkbox, Select, Space, Switch } from 'antd';
import './_application.css'

const Application = () => {
  const [createQuestion, setCreateQuestion] = useState<[]>([])
  const [imageUrl, setImageUrl] = useState<string>('')
  const [imageName, setImageName] = useState<string>('')
  const [selected, setSelected] = useState<string>('Paragraph')
  const [switchState, setSwitchState] = useState<boolean>(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    checked: false
    // Add more form fields here...
  })

  interface Info {
    title: String;
  }

  const infos: Info[] = [
    {
      title: 'Phone (without dial code)'
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

  const onSwitchToggle = (checked: boolean) => {
    setSwitchState(checked)
    console.log(checked)
  }

  const handleSelectChange = (value: string) => {
    setSelected(value)
    console.log(value)
    console.log(selected)
  }

  const handleFormChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    fetch('http://127.0.0.1:4010/api/1.0/application-form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log('API Response:', data);
    })
    .catch((error) => {
      console.error('API Error:', error);
    })
  }

  useEffect(() => {
    // Check if the selected value is 'Multiple choice'
    console.log(selected)
  }, [selected])

  const handleCreateQuestion = () => {
    const questionId = createQuestion.length
    const newQuestion = 
    <div key={questionId} className="new-question box-1">
      <div className='heading'>Questions</div>
      <div className='content'>
      <div className='create-question'>
        <label for="groupSize">Type</label>
        <Select
          defaultValue="Paragraph"
          onChange={handleSelectChange}
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

      {
        selected === 'Multiple choice' && (
          <div>
            <div className='create-question'>
              <label for="groupSize">Max choice allowed</label>
              <input type="text" placeholder='Enter no of choices allowed here' id="question" value=''/>
            </div>

            <div className='question-2 question-3'>
              <span className='choice'>Choice</span>
                <span className='image'>
                <img src='/images/list.png' alt='img' className='img-3'/>
                <input placeholder='Type here' type='text'/>
                <img src='/images/add.png' alt='img' className='add-3'/>
              </span>
            </div>
            <span className='enable'>
              <input type='checkbox'/>
              <span>Enable "Other" option</span>
            </span>
          </div>
        )
      }

      <div className='delete'>
        <span>
          <img src='/images/close.png' alt='img' onClick={handleDeleteQuestion}/>
          Delete Question
        </span>
        <button>Save</button>
      </div>
      </div>
    </div>
    setCreateQuestion([...createQuestion, newQuestion])
  }

  const handleDeleteQuestion = (questionId) => {
    // Filter out the question with the given ID from the createQuestion array
    const updatedQuestions = createQuestion.filter((question, index) => index !== questionId);
    setCreateQuestion(updatedQuestions);
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
                <img src='/images/close.png' alt='img' onClick={handleDeleteQuestion}/>
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
              <input placeholder='First Name'  type='text' id="firstName" required value={formData.firstName} onChange={handleFormChange}/>
              <input placeholder='Last Name' type='text' id="lastName" required value={formData.lastName} onChange={handleFormChange}/>
              <input placeholder='Email Name' type='email' id="email" required value={formData.email} onChange={handleFormChange}/>
            </form>
            {
              infos.map((info, index) => (
                <div className='row-1' key={index}>
                  <span className='title-1'>{info.title}</span>
                  <span className='switch'>
                    <span><Checkbox/> Internal</span>
                    <span><Switch onChange={onSwitchToggle}/> {!switchState ? 'Hide' : 'Show'}</span>
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
              profile.map((info, index) => (
                <div className='row-1' key={index}>
                  <span className='title-1'>{info.title}</span>
                  <span className='switch'>
                    <span><Checkbox/> Mandatory</span>
                    <span><Switch onChange={onSwitchToggle}/> {!switchState ? 'Hide' : 'Show'}</span>
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
                  <img src='/images/close.png' alt='img' onClick={handleDeleteQuestion}/>
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