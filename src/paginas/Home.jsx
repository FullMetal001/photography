import { useState, useEffect, useRef } from 'react';

const Home = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalImages, setModalImages] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const portImageRefs = useRef([]);
    const smImageRef = useRef(null);
    const ctImageRef = useRef(null);

    const Modal = ({ isOpen, onClose, images, currentIndex, onNext, onPrev }) => {
        if (!isOpen) return null;

        return (
            <div className="modal-overlay" onClick={onClose}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <button className="close-button" onClick={onClose}>X</button>
                    <div className="modal-images">
                        <img src={images[currentIndex]} alt={`modal-img-${currentIndex}`} />
                    </div>
                    <div className="modal-navigation">
                        <button onClick={onPrev} disabled={currentIndex === 0}>Atrás</button>
                        <button onClick={onNext} disabled={currentIndex === images.length - 1}>Siguiente</button>
                    </div>
                </div>
            </div>
        );
    };

    const handleImageClick = (images) => {
        setModalImages(images);
        setCurrentIndex(0);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const nextImage = () => {
        if (currentIndex < modalImages.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const prevImage = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const imagesData = [
        {
            main: '/images/desert1.jpg',
            related: ['/images/desert1.jpg', '/images/desert2.jpg'],
            title: 'DESERTIC LANDSCAPE'
        },
        {
            main: '/images/wedding1.jpg',
            related: ['/images/wedding1.jpg', '/images/wedding2.jpg', '/images/wedding3.jpg'],
            title: 'WEDDING'
        },
        {
            main: '/images/mountain1.jpg',
            related: ['/images/mountain1.jpg', '/images/mountain2.jpg'],
            title: 'MOUNTAINS'
        },
        {
            main: '/images/baby1.jpg',
            related: ['/images/baby1.jpg', '/images/baby2.jpg', '/images/baby3.jpg'],
            title: 'BABY PARTY'
        },
    ];

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible'); 
                } else {
                    entry.target.classList.remove('visible'); 
                }
            });
        });

        
        portImageRefs.current.forEach(image => {
            observer.observe(image);
        });

        if (smImageRef.current) {
            observer.observe(smImageRef.current);
        }

        if (ctImageRef.current) {
            observer.observe(ctImageRef.current);
        }

        return () => {            
            portImageRefs.current.forEach(image => {
                observer.unobserve(image);
            });
            if (smImageRef.current) {
                observer.unobserve(smImageRef.current);
            }
            if (ctImageRef.current) {
                observer.unobserve(ctImageRef.current);
            }
        };
    }, []);

    return (
        <div className='contenedor-principal'>
            <div className='header'>
                <div className='logo-icon'>
                    <img src='/images/logo-icon.png' alt='logo-p' />
                </div>
                <div className='logo-g'>
                    <img src='/images/logo-g.png' alt='image-top' />
                </div>
            </div>
            <div className='image-top'>
                <img src='/images/bg1.png' alt='bg image' className='bg-image' />
                <img src='/images/bu.png' alt='sm image' className='sm-image' ref={smImageRef} />
            </div>
            <div className='background'>
                <div className='info'>
                    <h3>Welcome to my Photography Portfolio</h3>
                    <p>I am Gabriela Carrillo, a professional photographer with more than 7 years of experience.</p>
                    <p>I specialize in capturing special moments with a natural and spontaneous style, and in landscape photography.</p>
                    <p>Enjoy the tour and if you want to capture your special moments forever, don't hesitate to contact me.</p>
                </div>
                <div className='portfolio'>
                    <div className='port-tittle'>
                        <h2>PORTFOLIO</h2>
                    </div>
                    <div className='port-image-container'>
                        {imagesData.map((item, index) => (
                            <div
                                className='port-image'
                                key={index}
                                ref={el => portImageRefs.current[index] = el} // Guarda la referencia del elemento
                                onClick={() => handleImageClick(item.related)}
                            >
                                <img src={item.main} alt={`image${index + 1}`} />
                                <p>{item.title}</p>
                                <span className="click-indicator">Click to see more</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='footer'>
                    <div className='footer-text'>
                        <h2>CONTACT</h2>
                        <p>photogabriela@gmail.com</p>
                    </div>
                    <img src='/images/buu.png' alt='contact-image' className='contact-image' ref={ctImageRef} />
                </div>
                <div className='botton-space'></div>
                <Modal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    images={modalImages}
                    currentIndex={currentIndex}
                    onNext={nextImage}
                    onPrev={prevImage}
                />
            </div>
        </div>
    );
};

export default Home;