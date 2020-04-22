import React from 'react';

const Playground = () => {
  const posts = [
    {
      name: 'a',
      length: 100,
      title: 'important',
    },
    {
      name: 'b',
      length: 200,
      title: 'not important',
    },
  ];

  function getPosts() {
    setTimeout(() => {
      posts.map((post) => {
        console.log(post.title);
      });
    }, 1500);
  }

  function createPost(cb, cb2) {
    setTimeout(() => {
      posts.push({ name: 'c', length: 300, title: 'mid importance' });
      cb();
      cb2();
    }, 500);
  }

  function anotherFunc() {
    console.log('another function');
  }

  function createPost2() {
    return new Promise((reject, resolve) => {
      setTimeout(() => {
        posts.push({ name: 'c', length: 300, title: 'mid importance' });
        resolve();
      }, 3000);
    });
  }

  function create() {
    return new Promise((reject, resolve) => {
      // do something
      setTimeout(() => {
        console.log('after time out');
        resolve();
        console.log('b');
      }, 1000);

      // then do the next thing
    }, 1000);
  }
  const another = () => {
    return new Promise((resolve, reject) => {
      if (posts.length > 2) {
        console.log('works');
        resolve();
        console.log('resolved');
      } else {
        reject(console.log('does not work'));
      }
    });
  };

  another()
    .then((res) => console.log('wow'))
    .catch((err) => console.log('dammit'));

  return (
    <div>
      <div style={{ margin: 20 }}>
        <h1>Playground</h1>
      </div>
    </div>
  );
};

export default Playground;
