import * as React from 'react'
import './SingleImageUploader.scss'
import { read } from 'fs';

export interface IProps {
    value?: string
    name: string
    onChange?: (e: React.ChangeEvent<any>) => void
    label?: string
}

export interface IState {
    selectedFile: any
}
export class SingleImageUploader extends React.Component<IProps, IState> {
    input_ref: any = null
    image_ref: any = null

    constructor(props: IProps) {
        super(props)
        this.state = {
            selectedFile: null
        }
    }
    async componentDidMount() {
        this.image_ref.src = await this.get_image_address()
    }
    async componentDidUpdate() {
        this.image_ref.src = await this.get_image_address()

    }
    async get_image_address() {
        debugger;
        let rtn = null
        if (this.state.selectedFile) {
            rtn = await this.read_file(this.state.selectedFile)
        } else {
            rtn = this.props.value || "/images/no-image-icon-hi.png"
        }
        return rtn
    }

    async file_change() {
        if (this.input_ref.files && this.input_ref.files[0]) {
            this.setState({ ...this.state, selectedFile: this.input_ref.files[0] })
            this.props.onChange && this.props.onChange(
                { target: { name: this.props.name, value: this.input_ref.files[0] } } as any as React.ChangeEvent

            )
        } else {
            this.setState({ ...this.state, selectedFile: null })
            this.props.onChange && this.props.onChange(
                { target: { name: this.props.name, value: null } } as any as React.ChangeEvent

            )
        }

        // this.readURL()
    }
    async read_file(file: any): Promise<string> {
        debugger;
        return new Promise((res, rej) => {
            var reader = new FileReader();
            reader.onload = function (e) {
                res((e.target as any).result)
            }
            reader.onerror = function (e) {
                rej(e)
            }
            reader.onabort = function (e) {
                rej(e)
            }
            reader.readAsDataURL(file);
        })
    }

    openSelectFile() {
        this.input_ref.click()
    }

    render() {
        return (<div className="single-image-uploader">
            <img
                ref={(i) => { this.image_ref = i }}
            ></img>
            <div onClick={this.openSelectFile.bind(this)}>

                <span>{this.props.label || "بارگزاری عکس"}
                </span>
            </div>
            <input
                hidden={true}
                type="file"
                ref={(i) => { this.input_ref = i }}
                onChange={this.file_change.bind(this)}
            ></input>
        </div>)
    }
}