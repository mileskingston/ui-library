/**
 * Taken and rewritten from https://github.com/mantaskaveckas/react-siema
 * Fixed errors and extended to support navigational dots.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from '../../helpers/debounce';
import './Carousel.styl';

class Carousel extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentSlide: props.startIndex
    };

    this.config = Object.assign({}, {
      resizeDebounce: 250,
      duration: 200,
      easing: 'ease-out',
      perPage: 1,
      startIndex: 0,
      draggable: true,
      threshold: 20,
      loop: false
    }, props);

    this.events = [
      'onTouchStart',
      'onTouchEnd',
      'onTouchMove',
      'onMouseDown',
      'onMouseUp',
      'onMouseLeave',
      'onMouseMove'
    ];

    this.events.forEach((handler) => {
      this[handler] = this[handler].bind(this);
    });
  }

  componentDidMount() {
    this.config.selector = this.selector;
    
    this.init();

    this.onResize = debounce(() => {
      this.resize();
      this.slideToCurrent();
    }, this.config.resizeDebounce);

    if (window) {
      window.addEventListener('resize', this.onResize);
    }

    if (this.config.draggable) {
      this.pointerDown = false;
      this.drag = {
        start: 0,
        end: 0
      };
    }
  }

  componentDidUpdate() {
    this.init();
  }

  componentWillUnmount() {
    if (window) {
      window.removeEventListener('resize', this.onResize);
    }
  }

  onTouchStart(e) {
    e.stopPropagation();
    this.pointerDown = true;
    this.drag.start = e.touches[0].pageX;
  }


  onTouchEnd(e) {
    e.stopPropagation();
    this.pointerDown = false;
    if (this.sliderFrame) {
      this.setStyle(this.sliderFrame, {
        webkitTransition: `all ${this.config.duration}ms ${this.config.easing}`,
        transition: `all ${this.config.duration}ms ${this.config.easing}`
      });
    }
    if (this.drag.end) {
      this.updateAfterDrag();
    }
    this.clearDrag();
  }

  onTouchMove(e) {
    e.stopPropagation();
    if (this.pointerDown && this.sliderFrame) {
      this.drag.end = e.touches[0].pageX;

      this.setStyle(this.sliderFrame, {
        webkitTransition: `all 0ms ${this.config.easing}`,
        transition: `all 0ms ${this.config.easing}`,
        [this.getTransformProperty()]: `translate3d(${((this.state.currentSlide *
          (this.selectorWidth / this.perPage)) + (this.drag.start - this.drag.end)) * -1}px, 0, 0)`
      });
    }
  }

  onMouseDown(e) {
    e.preventDefault();
    e.stopPropagation();
    this.pointerDown = true;
    this.drag.start = e.pageX;
  }

  onMouseUp(e) {
    e.stopPropagation();
    this.pointerDown = false;
    if (this.sliderFrame) {
      this.setStyle(this.sliderFrame, {
        cursor: '-webkit-grab',
        webkitTransition: `all ${this.config.duration}ms ${this.config.easing}`,
        transition: `all ${this.config.duration}ms ${this.config.easing}`
      });
    }
    if (this.drag.end) {
      this.updateAfterDrag();
    }
    this.clearDrag();
  }

  onMouseMove(e) {
    e.preventDefault();
    if (this.pointerDown && this.sliderFrame) {
      this.drag.end = e.pageX;
      this.setStyle(this.sliderFrame, {
        cursor: '-webkit-grabbing',
        webkitTransition: `all 0ms ${this.config.easing}`,
        transition: `all 0ms ${this.config.easing}`,
        [this.getTransformProperty()]: `translate3d(${((this.state.currentSlide *
          (this.selectorWidth / this.perPage)) + (this.drag.start - this.drag.end)) * -1}px, 0, 0)`


      });
    }
  }

  onMouseLeave(e) {
    if (this.pointerDown && this.sliderFrame) {
      this.pointerDown = false;
      this.drag.end = e.pageX;
      this.setStyle(this.sliderFrame, {
        cursor: '-webkit-grab',
        webkitTransition: `all ${this.config.duration}ms ${this.config.easing}`,
        transition: `all ${this.config.duration}ms ${this.config.easing}`
      });
      this.updateAfterDrag();
      this.clearDrag();
    }
  }

  getTransformProperty() {
    const { transform } = document ? document.documentElement.style : undefined;

    if (typeof transform === 'string') {
      return 'transform';
    }

    return 'WebkitTransform';
  }

  setStyle(target, styles) {
    Object.keys(styles).forEach((attribute) => {
      target.style[attribute] = styles[attribute];
    });
  }


  setSelectorWidth() {
    this.selectorWidth = this.selector.getBoundingClientRect().width;
  }

  setInnerElements() {
    if (this.sliderFrame) {
      this.innerElements = [].slice.call(this.sliderFrame.children);
    }
  }

  resolveSlidesNumber() {
    if (typeof this.config.perPage === 'number') {
      this.perPage = this.config.perPage;
    } else if (typeof this.config.perPage === 'object') {
      this.perPage = 1;
      for (const viewport in this.config.perPage) {
        if (window && window.innerWidth > viewport) {
          this.perPage = this.config.perPage[viewport];
        }
      }
    }
  }

  prev() {
    if (this.state.currentSlide === 0 && this.config.loop) {
      this.setState({
        currentSlide: this.innerElements.length - this.perPage
      });
    } else {
      
      this.setState({
        currentSlide: Math.max(this.state.currentSlide - 1, 0)
      });
    }
    
    this.slideToCurrent();
  }

  next() {
    if (this.state.currentSlide === this.innerElements.length - this.perPage && this.config.loop) {
      this.setState({
        currentSlide: 0
      });
      
    } else {
      this.setState({
        currentSlide: Math.min(
          this.state.currentSlide + 1,
          this.innerElements.length - this.perPage
        )
      });
    }
    
    this.slideToCurrent();
  }

  goTo(index) {
    this.setState({
      currentSlide: Math.min(Math.max(index, 0), this.innerElements.length - 1)
    });
    
    this.slideToCurrent();
  }

  slideToCurrent() {
    if (this.sliderFrame) {
      this.sliderFrame.style[this.getTransformProperty()] =
        `translate3d(-${this.state.currentSlide * (this.selectorWidth / this.perPage)}px, 0, 0)`;
    }
  }

  updateAfterDrag() {
    const movement = this.drag.end - this.drag.start;
    if (movement > 0 && Math.abs(movement) > this.config.threshold) {
      this.prev();
    } else if (movement < 0 && Math.abs(movement) > this.config.threshold) {
      this.next();
    }
    this.slideToCurrent();
  }

  resize() {
    this.resolveSlidesNumber();

    if (this.selector && this.sliderFrame) {
      this.selectorWidth = this.selector.getBoundingClientRect().width;
      this.setStyle(this.sliderFrame, {
        width: `${(this.selectorWidth / this.perPage) * this.innerElements.length}px`
      });
    }
  }

  clearDrag() {
    this.drag = {
      start: 0,
      end: 0
    };
  }

  init() {
    if (this.selector && this.sliderFrame) {
      this.setSelectorWidth();
      this.setInnerElements();
      this.resolveSlidesNumber();

      this.setStyle(this.sliderFrame, {
        width: `${(this.selectorWidth / this.perPage) * this.innerElements.length}px`,
        webkitTransition: `all ${this.config.duration}ms ${this.config.easing}`,
        transition: `all ${this.config.duration}ms ${this.config.easing}`
      });

      for (let i = 0; i < this.innerElements.length; i++) {
        this.setStyle(this.innerElements[i], {
          width: `${100 / this.innerElements.length}%`
        });
      }

      this.slideToCurrent();
    }
  }

  render() {
    return (
      <div
        ref={(selector) => { this.selector = selector; }}
        data-component="Carousel"
        className="dc-carousel"
        {...this.events.reduce(
          (props, event) => Object.assign({}, props, { [event]: this[event] }),
          {}
        )}
      >
        <div ref={(sliderFrame) => { this.sliderFrame = sliderFrame; }}>
          {React.Children.map(this.props.children, (children, index) =>
            React.cloneElement(children, { key: index, className: 'dc-carousel__item' }))}
        </div>

        <div className="dc-carousel__navigation">
          {this.props.children.map((child, i) => {
            const navigationItemClasses = ['dc-carousel__navigation__item'];

            if (this.state.currentSlide === i) {
              navigationItemClasses.push('dc-carousel__navigation__item--current');
            }

            return (
              <span
                key={i}
                className={navigationItemClasses.join(' ')}
                onClick={() => this.goTo(i)}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

Carousel.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]).isRequired,
  draggable: PropTypes.bool,
  duration: PropTypes.number,
  easing: PropTypes.string,
  loop: PropTypes.bool,
  perPage: PropTypes.number,
  resizeDebounce: PropTypes.number,
  startIndex: PropTypes.number,
  threshold: PropTypes.number
};

Carousel.defaultProps = {
  draggable: true,
  duration: 200,
  easing: 'ease-out',
  loop: false,
  perPage: 1,
  resizeDebounce: 250,
  startIndex: 0,
  threshold: 20
};

export default Carousel;
