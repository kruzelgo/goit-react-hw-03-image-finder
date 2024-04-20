import React, { Component } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import Button from './Button';
import Modal from './Modal';
import './styles.css';

const API_KEY = '42569428-b104c6fed739ee1603d22c65f';
const perPage = 12;

export class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    loading: false,
    showModal: false,
    modalImage: '',
    modalAlt: '',
    loadMore: true,
  };

  componentDidUpdate(prevProps, prevState) {
    const { page, query } = this.state;
    if (page !== prevState.page || query !== prevState.query) {
      this.fetchData();
    }
  }

  fetchData = async () => {
    const { page, query } = this.state;
    this.setState({ loading: true });

    try {
      const response = await fetch(
        `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const { hits, totalHits } = data;
      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        loadMore: page < Math.ceil(totalHits / perPage),
      }));
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      this.setState({ loading: false });
    }
  };

  handleSubmit = query => {
    this.setState({ query, images: [], page: 1 }, () => {
      this.fetchData();
    });
  };

  handleLoadMore = () => {
    this.setState(
      prevState => ({ page: prevState.page + 1 }),
      () => {
        this.fetchData();
      }
    );
  };

  handleImageClick = (imageSrc, imageAlt) => {
    this.setState({
      modalImage: imageSrc,
      modalAlt: imageAlt,
      showModal: true,
    });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { images, loading, showModal, modalImage, modalAlt, loadMore } =
      this.state;

    return (
      <div
        style={{
          // height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101',
        }}
      >
        <div>
          <Searchbar onSubmit={this.handleSubmit} />
          {loading ? (
            <Loader />
          ) : (
            <ImageGallery
              images={images}
              onImageClick={this.handleImageClick}
            />
          )}
          {loadMore && !loading && images.length > 0 && (
            <Button onLoadMore={this.handleLoadMore} />
          )}
          {showModal && (
            <Modal
              imgUrl={modalImage}
              alt={modalAlt}
              onClose={this.handleCloseModal}
            />
          )}
        </div>
      </div>
    );
  }
}

// export default App;
