import 'phaser';
import logoImg from '../assets/logo.png'

export default class PreloaderScene extends Phaser.Scene {
    constructor() {
        super('Preloader');
    }

    preload() {
        this.add.image(400, 200, logoImg)

        // add a progress bar
        let progressBar = this.add.graphics()
        let progressBox = this.add.graphics()
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(240, 270, 320, 50)

        let width = this.camera.main.width;
        let height = this.camera.main.height;

        let loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'loading...',
            style: {
                font: '20px monospace',
                fill: '#fff'
            }
        })
        loadingText.setOrigin(0.5, 0.5);

        // percentage indicator
        let percentText = this.makeText({
            x: width / 2,
            y: height / 2 - 5,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        })
        percentText.setOrigin(0.5, 0.5)

        let assetText = this.make.text({
            x: width / 2,
            y: height / 2 + 50,
            text: '',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        assetText.setOrigin(0.5, 0.5);

        // update the progress bar

        this.load.on('progress', function(value) {
            percentText.setText((value * 100) + '%')
            progressBar.clear()
            progressBar.fillStyle(0xffffff, 1)
            progressBar.fillRect(250, 280, 300 * value, 30)
        })


    }

    create() {}
};