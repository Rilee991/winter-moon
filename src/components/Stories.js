import React, { useState } from 'react';

import pic1 from '../images/1.jpg';
import pic2 from '../images/2.png';
import pic3 from '../images/3.jpg';
import pic4 from '../images/4.jpg';
import pic5 from '../images/5.jpg';
import pic6 from '../images/6.jpg';
import pic7 from '../images/7.jpg';

function Stories() {
    const [stories, setStories] = useState([
        { id: 1, image: pic1, name: 'cypher33' }, 
        { id: 2, image: pic2, name: 'ronnie4' }, 
        { id: 3, image: pic3, name: 'de villiers' }, 
        { id: 4, image: pic4, name: 'watsn' }, 
        { id: 5, image: pic5, name: 'harilal' }, 
        { id: 6, image: pic6, name: 'fuck.me' }, 
        { id: 7, image: pic7, name: 'awesome.dude' }
    ]);

    return (
        <div className="stories">
            {stories.map((story) => (
                <div className="stories__info" key={story.id}>
                    <div className="stories__img">
                        <span>
                            <img src={story.image} alt="user"/>
                        </span>
                    </div>
                    <div className="stories__name">
                        {story.name}
                    </div>
                </div>
                )
            )}
        </div>
    )
}

export default Stories
