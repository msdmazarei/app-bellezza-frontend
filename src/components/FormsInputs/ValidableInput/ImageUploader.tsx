import * as React from 'react'
import ReactImageUploadComponent from 'react-images-upload'
import './imageupload.scss'

export interface IState {

    pictures: Array<any>
}

export interface IProps {
    label?: string
    name: string,
    onValidatedChange?: (e: React.ChangeEvent, is_valid: boolean) => void
    onChange?: (e: React.ChangeEvent) => void
}

class UploadImageComponent extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            pictures: []
        }
    }
    onDrop(picture: any) {
        debugger;

        this.setState({
            ...this.state,
            pictures: this.state.pictures.concat(picture),
        });
        this.props.onValidatedChange && this.props.onValidatedChange(
            { target: { name: this.props.name, value: picture } } as any as React.ChangeEvent, true)
        this.props.onChange && this.props.onChange(
            { target: { name: this.props.name, value: picture } } as any as React.ChangeEvent
        )
    }

    render() {
        return (
            <ReactImageUploadComponent
                withPreview
                withIcon={false}
                buttonText={this.props.label}
                label="برروی دکمه زیر کلیک کنید و از میان تصاویر موجود روی دستگاه تان عکس هایی را که می خواهید بارگذاری کنید."
                fileSizeError="حجم عکس انتخابی بیش از مقدار مجاز است."
                fileTypeError="این قالب عکس پشتیبانی نمی شود"
                onChange={this.onDrop.bind(this)}
                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                maxFileSize={5242880}
                className="msd-upload-image"
            >

            </ReactImageUploadComponent>
        )
    }
}


export const ImageInput = UploadImageComponent;