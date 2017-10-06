const assert = require('assertthat');
const Client = require('../../lib/client/Client');
const Playlist = require('../../lib/playlist/Playlist');
const PlaylistItem = require('../../lib/playlist/Item');
const MediaStream = require('../../lib/stream/MediaStream');
const MediaSource = require('../../lib/mediasource/MediaSource');
const MediaSourceYoutube = require('../../lib/mediasource/Youtube');

describe('MediaStream Tests', () => {
  describe('Test constructor', () => {
    it('Must throw an error if the passed playlist is not an instance of Playlist', (done) => {
      assert.that(() => {
        const stream = new MediaStream();
      }).is.throwing('Parameter playlist must be an instance of PlayList!');

      done();
    });

    it('Must throw an errror if no decoder was passed to the constructor', (done) => {
      assert.that(() => {
        const playlist = new Playlist({});
        const stream = new MediaStream(playlist);
      }).is.throwing('Parameter decorder must be set!');

      done();
    });

    it('Must throw an error if no encoder was passed to the constructor', (done) => {
      assert.that(() => {
        const playlist = new Playlist({});
        const decoder = {};
        const stream = new MediaStream(playlist, decoder);
      }).is.throwing('Parameter encoder must be set!');

      done();
    });
  });

  describe('Test hasMediaSource method', () => {
    it('Must return false if no such MediaSource is registered', (done) => {
      const playlist = new Playlist({});
      const decoder = {};
      const encoder = {};
      const stream = new MediaStream(playlist, decoder, encoder);

      assert.that(stream.hasMediaSource('test')).is.false();

      done();
    });

    it('Must return true after adding a mediasource', (done) => {
      const playlist = new Playlist({});
      const decoder = {};
      const encoder = {};
      const stream = new MediaStream(playlist, decoder, encoder);
      const mediasource = new MediaSourceYoutube();
      stream.registerMediaSource(mediasource);

      assert.that(stream.hasMediaSource('youtube')).is.true();

      done();
    });
  });

  describe('Test getMediaSource method', () => {
    it('Must throw an error if no such mediasource is registered', (done) => {
      assert.that(() => {
        const playlist = new Playlist({});
        const decoder = {};
        const encoder = {};
        const stream = new MediaStream(playlist, decoder, encoder);

        stream.getMediaSource('youtube');
      }).is.throwing('No mediasource with name youtube registered!');

      done();
    });

    it('Must retrun the previously added mediasource', (done) => {
      const playlist = new Playlist({});
      const decoder = {};
      const encoder = {};
      const stream = new MediaStream(playlist, decoder, encoder);
      const mediasource = new MediaSourceYoutube();
      stream.registerMediaSource(mediasource);

      assert.that(stream.getMediaSource('youtube')).is.sameAs(mediasource);

      done();
    });
  });

  describe('Test registerMediaSource method', () => {
    it('Must throw an error if the passed mediasource is not an instance of MediaSource', (done) => {
      assert.that(() => {
        const playlist = new Playlist({});
        const decoder = {};
        const encoder = {};
        const stream = new MediaStream(playlist, decoder, encoder);
        stream.registerMediaSource({});
      }).is.throwing('The given mediasource is not an instance of MediaSource!');

      done();
    });

    it('Must throw an error if one tries to add the same mediasource twice', (done) => {
      assert.that(() => {
        const playlist = new Playlist({});
        const decoder = {};
        const encoder = {};
        const stream = new MediaStream(playlist, decoder, encoder);
        const mediasource = new MediaSourceYoutube();
        stream.registerMediaSource(mediasource);
        stream.registerMediaSource(mediasource);
      }).is.throwing('MediaSource with name youtube already added!');

      done();
    });

    it('Must have the previously added mediasource', (done) => {
      const playlist = new Playlist({});
      const decoder = {};
      const encoder = {};
      const stream = new MediaStream(playlist, decoder, encoder);
      const mediasource = new MediaSourceYoutube();
      stream.registerMediaSource(mediasource);

      assert.that(stream.hasMediaSource('youtube')).is.true();
      assert.that(stream.getMediaSource('youtube')).is.sameAs(mediasource);

      done();
    });
  });

  describe('Test unregisterMediaSource method', () => {
    it('Must throw an error if no mediasource with the given name is registered', (done) => {
      assert.that(() => {
        const playlist = new Playlist({});
        const decoder = {};
        const encoder = {};
        const stream = new MediaStream(playlist, decoder, encoder);
        stream.unregisterMediaSource('youtube');
      }).is.throwing('No MediaSource with name youtube registered!');

      done();
    });

    it('Must remove the previously added mediasource', (done) => {
      const playlist = new Playlist({});
      const decoder = {};
      const encoder = {};
      const stream = new MediaStream(playlist, decoder, encoder);
      const mediasource = new MediaSourceYoutube();
      stream.registerMediaSource(mediasource);
      assert.that(stream.hasMediaSource('youtube')).is.true();

      stream.unregisterMediaSource('youtube');
      assert.that(stream.hasMediaSource('youtube')).is.false();

      done();
    });
  });

  describe('Test hasClient method', () => {
    const playlist = new Playlist({});
    const decoder = {};
    const encoder = {};
    const stream = new MediaStream(playlist, decoder, encoder);
    const client = new Client();
    stream.registerClient(client);

    it('Must return false if no such client is registered', (done) => {
      assert.that(stream.hasClient('test')).is.false();

      done();
    });

    it('Must return true if the given client is registered', (done) => {
      assert.that(stream.hasClient(client.getId())).is.true();

      done();
    });
  });

  describe('Test getClient method', () => {
    const playlist = new Playlist({});
    const decoder = {};
    const encoder = {};
    const stream = new MediaStream(playlist, decoder, encoder);
    const client = new Client();
    stream.registerClient(client);

    it('Must throw an error if no client with the given id is registered', (done) => {
      assert.that(() => {
        stream.getClient('test');
      }).is.throwing('No client with id test registered!')

      done();
    });

    it('Must return the previously added client', (done) => {
      const ret = stream.getClient(client.getId());
      assert.that(ret).is.sameAs(client);

      done();
    });
  });

  describe('Test registerClient method', () => {
    it('Must throw an error if the given client is not an instance of Client', (done) => {
      assert.that(() => {
        const playlist = new Playlist({});
        const decoder = {};
        const encoder = {};
        const stream = new MediaStream(playlist, decoder, encoder);
        stream.registerClient({});
      }).is.throwing('The given client must be an instance of Client!');

      done();
    });
  });

  describe('Test unregisterClient method', () => {
    it('Must throw an error if no such client is registered', (done) => {

      done();
    });
  });
});
