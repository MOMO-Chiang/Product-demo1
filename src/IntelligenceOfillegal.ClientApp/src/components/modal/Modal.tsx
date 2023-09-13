import { Component, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { v4 as uuidV4 } from 'uuid';
import cx from 'classnames';
import { ModalHeader } from './ModalHeader';
import { ModalTitle } from './ModalTitle';
import { ModalBody } from './ModalBody';
import { ModalFooter } from './ModalFooter';
import { ModalCloseButton } from './ModalCloseButton';

const MODAL_ROOT_EL_ID = 'appModalRoot';
const MODAL_BASE_CLASS_NAME = 'modal app-modal fade';
const MODAL_FADE_SHOW_CLASS_NAME = 'modal app-modal fade show';
const MODAL_FADE_HIDE_CLASS_NAME = 'modal app-modal fade';

const modalRootEl = document.getElementById(MODAL_ROOT_EL_ID);

export interface ModalProps {
  /** 是否顯示 Modal */
  show?: boolean;
  id?: string;
  className?: string;
  children?: ReactNode;
  size?: 'sm' | 'lg' | 'xl' | 'none';
}

interface ModalState {
  /** 唯一 id，辨識用 */
  uid: string;
  /** 內部用來控制真正顯示或隱藏的 flag */
  exactShow: boolean;
}

export class Modal extends Component<ModalProps, ModalState> {
  static Header = ModalHeader;
  static Title = ModalTitle;
  static Body = ModalBody;
  static Footer = ModalFooter;
  static CloseButton = ModalCloseButton;

  modalEl: HTMLDivElement;
  bodyEl: HTMLBodyElement;

  constructor(props: ModalProps) {
    super(props);
    this.state = {
      uid: props.id || `modal_${uuidV4()}`,
      exactShow: false,
    };
    // 建立 Modal Element
    this.modalEl = document.createElement('div');
    this.modalEl.id = this.state.uid;
    this.modalEl.className = this.getModalClassName(MODAL_BASE_CLASS_NAME, props.size);

    this.bodyEl = document.getElementsByTagName('body')[0];

    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  componentDidUpdate(prevProps: Readonly<ModalProps>, prevState: Readonly<ModalState>, snapshot?: any): void {
    if (this.props.show && !prevProps.show) {
      this.showModal();
    }

    if (!this.props.show && prevProps.show) {
      this.hideModal();
    }
  }

  componentDidMount() {
    if (this.props.show) {
      this.showModal();
    }
  }

  componentWillUnmount() {
    // Remove the element from the DOM when we unmount

    // 若存在，從畫面中移除
    const isExists = document.getElementById(this.state.uid);
    if (isExists) {
      modalRootEl!.removeChild(this.modalEl);
    }

    // 清除 element 物件
    this.modalEl = undefined as any as HTMLDivElement;
  }

  showModal() {
    modalRootEl!.appendChild(this.modalEl);
    this.modalEl.style.display = 'block';

    const delayShow = setTimeout(() => {
      this.modalEl.className = this.getModalClassName(MODAL_FADE_SHOW_CLASS_NAME, this.props.size);
      this.setState({ exactShow: true });
      clearTimeout(delayShow);
    }, 0);
  }

  hideModal() {
    this.modalEl.className = this.getModalClassName(MODAL_FADE_HIDE_CLASS_NAME, this.props.size);

    const delayHide = setTimeout(() => {
      this.modalEl.style.display = 'none';
      this.setState({ exactShow: false });
      clearTimeout(delayHide);

      modalRootEl!.removeChild(this.modalEl);
    }, 160);
  }

  getModalClassName(base: string, size?: string) {
    const sizeClassName = size && size !== 'none' ? `modal-${size}` : '';

    return base + ' ' + sizeClassName;
  }

  render() {
    // Use a portal to render the children into the element
    return createPortal(
      <div className={cx('modal-dialog', this.props.className)}>
        {this.state.exactShow && <div className="modal-content">{this.props.children}</div>}
      </div>,
      // A DOM element
      this.modalEl,
    );
  }
}
