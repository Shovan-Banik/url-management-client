import { useState } from 'react';
import './App.css';
import Marquee from "react-fast-marquee";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import {base_url} from './configarable';

function App() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const longUrl = form.url_id.value;
    setUrl('');
    setShortUrl('');
    setLoading(true)
    axios.post(`${base_url}/shortenUrl`, { originalUrl: longUrl })
      .then(res => {
        const data = res.data;
        setLoading(false)
        if (data.error) {
          toast('Not a valid URL😥 Try Again With a Valid URL!');
        } else {
          setUrl(longUrl);
          setShortUrl(data.shortUrl);
          toast('Well done 🔥 Now click the URL🤗');
        }
        form.reset();
      })
      .catch(error => {
        form.reset();
        console.error('Error:', error);
        toast('Not a valid URL😥 Try Again With a Valid URL!');
        setLoading(false)
      });
  };

  return (
    <div className='bg-black min-h-screen'>
      <p className='text-red-600 py-5 text-center font-bold text-5xl'>Welcome To The URL Shortener</p>
      <div className='bg-red-700 p-5  w-4/5 md:w-2/3 m-auto rounded-lg'>
        <Marquee className=''>
          <p className='text-center text-black my-5 font-semibold'>Give Your URL and Click The Submit Button</p>
        </Marquee>
        <div className='my-8 flex justify-center w-full'>
          <form className='w-full md:w-1/2 md:flex md:gap-2' onSubmit={handleSubmit}>
            <input type="text" name='url_id' placeholder="Give your URL" className="input input-bordered w-full" />
            <button type='submit' className="btn btn-active btn-neutral bg-black mt-4 md:mt-0">{loading ? 'loading...' : 'Submit'}</button>
          </form>
        </div>
        <div className='flex justify-center mt-5'>
          {shortUrl && (
            <div className='pb-12'>
              <p className='text-black font-semibold'>Original URL : {url}</p>
              <p className='text-black font-semibold'>Shorten URL : <span className='underline text-blue-500'><a href={`${base_url}/${shortUrl}`} target="_blank" rel="noopener noreferrer">{`${base_url}/${shortUrl}`}</a></span></p>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;

