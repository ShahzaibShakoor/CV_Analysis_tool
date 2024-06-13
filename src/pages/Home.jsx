import { Avatar, IconButton, TextField, Tooltip } from '@mui/material';
import Button from '../components/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { signInWithGooglePopup } from '../config/firebase_config';
import { useState } from 'react';
import BasicModal from '../components/Modal';
import { useAuth } from '../context/AuthContext';

function Home() {
  const [jdModal, setJdModal] = useState(false);
  const [cvModal, setCvModal] = useState(false);
  const [jobDescription, setJobDescription] = useState('');
  const [state, setState] = useState({});

  const { user, login, isAuthenticated } = useAuth();

  const handleOpen = () => setJdModal(true);
  const handleOpenCvModal = () => setCvModal(true);
  const handleClose = () => {
    setJdModal(false);
    setCvModal(false);
    console.log(isAuthenticated, user);
  };
  const handleJD = e => {
    e.preventDefault();
    setState(old => ({ ...old, jobDescription: jobDescription }));
    setJobDescription(() => '');
    handleClose();
  };

  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }

  const logGoogleUser = async () => {
    try {
      const response = await signInWithGooglePopup();
      login(response.user);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <BasicModal handleClose={handleClose} isOpen={jdModal}>
        <h4 className="text-[#333] text-base mb-4">
          {
            "Insert your job description here. You don't need to worry about the layout or structure. Just include the essence of the job, tasks, deliverables, requirements, qualifications, skills, etc."
          }
        </h4>
        <form onSubmit={handleJD}>
          <TextField
            style={{ width: '100%' }}
            label="Job Description"
            onChange={e => setJobDescription(e.target.value)}
            multiline
            rows={20}
            defaultValue={jobDescription}
          />
          <div className="flex gap-8 justify-center mt-6">
            <Button
              type={'submit'}
              classes={'px-7 w-44 h-14 bg-[#000300] text-3xl'}
            >
              Confirm
            </Button>
            <Button
              type={'button'}
              handleClick={handleClose}
              classes={'px-7 w-44 h-14 bg-[#4E4E4E] text-3xl'}
            >
              Cancel
            </Button>
          </div>
        </form>
      </BasicModal>
      <BasicModal handleClose={handleClose} isOpen={cvModal}>
        <div className="h-[40rem] border-2 rounded text-center content-center">
          <Button
            classes={
              'w-28 h-11 text-black text-base border-2 border-black rounded'
            }
          >
            Open Files
          </Button>
        </div>
        <div className="flex gap-8 justify-center mt-6">
          <Button classes={'px-7 w-44 h-14 bg-[#000300] text-3xl'}>OK</Button>
          <Button
            type={'button'}
            handleClick={handleClose}
            classes={'px-7 w-44 h-14 bg-[#4E4E4E] text-3xl'}
          >
            Cancel
          </Button>
        </div>
      </BasicModal>
      <div className="h-[100%] grid grid-cols-[2fr_1fr] grid-rows-[1fr_8fr]">
        <div className="justify-self-center self-center col-start-2">
          <Tooltip
            title={isAuthenticated ? user.displayName : 'Login'}
            placement="right"
            arrow
          >
            {!isAuthenticated ? (
              <IconButton
                aria-label="account"
                // style={{ height: '2.5rem', width: '2.5rem' }}
                onClick={logGoogleUser}
              >
                <AccountCircleIcon sx={{ fontSize: 70, color: '#fff' }} />
              </IconButton>
            ) : user.photoURL ? (
              <Avatar
                alt="User Image"
                src={user.photoURL}
                sx={{ width: 70, height: 70 }}
              />
            ) : (
              <Avatar
                {...stringAvatar(user.displayName)}
                sx={{ width: 70, height: 70 }}
              />
            )}
          </Tooltip>
        </div>
        <div className="justify-self-center self-center">
          <h1 className="text-white text-6xl font-bold text-wrap">
            Evaluate a CV of
            <br />a candidate with AI
          </h1>
        </div>
        <div className="justify-self-start self-center flex flex-col gap-16">
          <Button
            classes={`px-7 w-80 h-28 ${
              !state.jobDescription
                ? 'bg-[#4E4E4E]'
                : 'bg-gradient-to-t from-[#00CF21CC] to-[#01430CCC]'
            } text-4xl`}
            handleClick={handleOpen}
          >
            {!state.jobDescription
              ? 'Paste your job description'
              : 'Job Description Pasted!'}
          </Button>
          <Button
            handleClick={handleOpenCvModal}
            classes={'px-7 w-80 h-28 bg-[#4E4E4E] text-4xl'}
          >
            Upload some CV
          </Button>
          <Button
            handleClick={() => console.log(state)}
            classes={'px-7 w-80 h-24 bg-[#4E4E4E] text-4xl'}
          >
            Analyze
            <br />
            (x tokens)
          </Button>
        </div>
      </div>
    </>
  );
}

export default Home;
