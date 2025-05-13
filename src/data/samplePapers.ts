import { ResearchPaper } from '../utils/types/research';

export const INITIAL_DATA: ResearchPaper[] = [
  {
    id: '1',
    title: 'Deep Residual Learning for Image Recognition',
    authors: ['Kaiming He', 'Xiangyu Zhang', 'Shaoqing Ren', 'Jian Sun'],
    year: 2016,
    publisher: 'IEEE Conference on Computer Vision and Pattern Recognition',
    summary: 'Introduced the concept of residual learning and ResNet architecture, which enabled training much deeper neural networks by using skip connections to address the degradation problem, significantly advancing the field of computer vision.',
    tags: ['residual networks', 'deep learning', 'computer vision', 'image recognition', 'neural networks'],
    selected: false
  },
  {
    id: '2',
    title: 'ImageNet Classification with Deep Convolutional Neural Networks',
    authors: ['Alex Krizhevsky', 'Ilya Sutskever', 'Geoffrey E. Hinton'],
    year: 2012,
    publisher: 'Advances in Neural Information Processing Systems',
    summary: 'Introduced AlexNet, a deep convolutional neural network that significantly outperformed previous methods on the ImageNet competition, catalyzing the deep learning revolution in computer vision.',
    tags: ['AlexNet', 'CNN', 'deep learning', 'computer vision', 'image classification'],
    selected: false
  },
  {
    id: '3',
    title: 'U-Net: Convolutional Networks for Biomedical Image Segmentation',
    authors: ['Olaf Ronneberger', 'Philipp Fischer', 'Thomas Brox'],
    year: 2015,
    publisher: 'Medical Image Computing and Computer-Assisted Intervention',
    summary: 'Introduced the U-Net architecture, a convolutional network design with a U-shaped structure that enables precise image segmentation with limited training data, becoming a cornerstone for biomedical image analysis.',
    tags: ['U-Net', 'image segmentation', 'biomedical imaging', 'convolutional networks', 'deep learning'],
    selected: false
  }
];