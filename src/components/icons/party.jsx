import React from 'react'

class Party extends React.Component {
    constructor(props) {
        super(props)
        this.displayName = 'Party'
    }
    render() {
    	// taken from http://www.flaticon.com/free-icon/balloons_113192
        return <svg viewBox="0 0 465.647 465.647" className="svg-icon">
			<g>
				<path d="m190.472,51.576c5.184,1.71 10.09,3.898 14.583,6.504 1.185,0.687 2.479,1.014 3.756,1.014 2.586,0 5.103-1.34 6.495-3.738 2.078-3.583 0.858-8.172-2.725-10.251-5.388-3.125-11.246-5.74-17.412-7.774-3.932-1.296-8.174,0.839-9.472,4.773-1.296,3.934 0.842,8.175 4.775,9.472z"/>
				<path d="m241.324,131.864c0,11.188-1.299,22.624-3.861,33.988-0.911,4.041 1.626,8.055 5.667,8.966 0.555,0.125 1.11,0.185 1.656,0.185 3.429,0 6.524-2.367 7.31-5.852 2.806-12.445 4.229-24.99 4.229-37.287 0-26.19-6.392-48.006-18.998-64.839-2.482-3.315-7.184-3.991-10.499-1.508-3.315,2.483-3.991,7.184-1.508,10.499 10.619,14.181 16.004,32.971 16.004,55.848z"/>
				<path d="m133.014,246.387c-18.639-12.713-35.305-37.093-44.583-65.214-1.298-3.934-5.541-6.07-9.473-4.772-3.934,1.298-6.07,5.539-4.772,9.473 10.429,31.609 28.791,58.182 50.376,72.906 1.293,0.882 2.764,1.305 4.219,1.305 2.396,0 4.751-1.146 6.203-3.274 2.333-3.424 1.452-8.09-1.97-10.424z"/>
				<path d="m394.91,122.486c-22.834-22.239-54.827-34.486-90.086-34.486-7.438,0-14.791,0.552-21.94,1.626-5.953-21.611-16.722-40.285-31.974-55.14-22.834-22.239-54.827-34.486-90.086-34.486s-67.252,12.247-90.086,34.486c-24.477,23.839-37.415,57.512-37.415,97.378 0,40.601 13.306,82.862 36.507,115.947 19.778,28.206 44.181,46.355 70.241,52.677-1.751,3.287-2.748,7.034-2.748,11.011v16c0,4.142 3.358,7.5 7.5,7.5h8.055c-0.611,4.613-1.784,7.741-3.077,11.189-2.099,5.594-4.478,11.936-4.478,23.958 0,12.029 2.378,18.373 4.477,23.971 1.891,5.042 3.523,9.396 3.523,18.706s-1.632,13.664-3.523,18.706c-2.099,5.598-4.477,11.942-4.477,23.971 0,4.142 3.358,7.5 7.5,7.5s7.5-3.358 7.5-7.5c0-9.309 1.632-13.663 3.522-18.705 2.099-5.598 4.478-11.942 4.478-23.971s-2.379-18.374-4.478-23.971c-1.89-5.042-3.522-9.396-3.522-18.705 0-9.301 1.632-13.652 3.522-18.689 1.612-4.297 3.385-9.045 4.123-16.458h8.855c4.142,0 7.5-3.358 7.5-7.5v-16c0-3.977-0.997-7.724-2.748-11.011 3.782-0.917 7.529-2.083 11.233-3.494 19.706,48.458 53.874,82.187 91.291,91.439-1.769,3.3-2.776,7.067-2.776,11.067v16c0,4.142 3.358,7.5 7.5,7.5h8.055c-0.611,4.613-1.784,7.741-3.077,11.189-2.099,5.594-4.478,11.936-4.478,23.958 0,4.142 3.358,7.5 7.5,7.5s7.5-3.358 7.5-7.5c0-9.301 1.632-13.652 3.522-18.689 1.612-4.297 3.385-9.045 4.123-16.458h8.855c4.142,0 7.5-3.358 7.5-7.5v-16c0-3.977-0.997-7.724-2.748-11.011 26.06-6.322 50.463-24.472 70.241-52.677 23.2-33.085 36.506-75.346 36.506-115.947 0.002-39.869-12.936-73.542-37.412-97.381zm-312.798,116.713c-21.473-30.622-33.788-69.744-33.788-107.335 0-35.726 11.37-65.683 32.88-86.632 20.017-19.496 48.293-30.232 79.62-30.232s59.604,10.736 79.62,30.231c21.51,20.95 32.88,50.907 32.88,86.632 0,37.592-12.315,76.714-33.788,107.335-22.068,31.471-50.021,48.802-78.712,48.802-28.691,0-56.645-17.331-78.712-48.801zm87.212,72.301v8.5h-17v-8.5c0-4.687 3.813-8.5 8.5-8.5s8.5,3.813 8.5,8.5zm144,88v8.5h-17v-8.5c0-4.687 3.813-8.5 8.5-8.5s8.5,3.813 8.5,8.5zm70.212-72.301c-22.068,31.47-50.021,48.801-78.712,48.801-20.222,0-40.459-8.813-58.523-25.485-16.234-14.983-30.29-36.135-39.884-59.906 4.884-2.742 9.666-5.924 14.321-9.535 10.728,28.423 27.899,52.114 47.824,65.704 1.293,0.882 2.764,1.305 4.219,1.305 2.396,0 4.751-1.146 6.203-3.274 2.334-3.422 1.452-8.088-1.97-10.422-18.363-12.525-34.806-36.376-44.161-63.971 6.683-6.604 13.034-14.147 18.965-22.605 23.2-33.085 36.506-75.346 36.506-115.947 0-9.561-0.752-18.76-2.221-27.559 6.099-0.867 12.372-1.305 18.721-1.305 31.327,0 59.604,10.736 79.62,30.231 21.51,20.95 32.88,50.907 32.88,86.632 5.68434e-14,37.593-12.315,76.715-33.788,107.336z"/>
				<path d="m381.326,155.024c-2.482-3.315-7.184-3.991-10.499-1.508s-3.991,7.184-1.508,10.499c10.62,14.181 16.005,32.971 16.005,55.848 0,11.188-1.299,22.624-3.861,33.988-0.911,4.041 1.626,8.055 5.667,8.966 0.555,0.125 1.11,0.185 1.656,0.185 3.429,0 6.524-2.367 7.31-5.852 2.806-12.445 4.229-24.99 4.229-37.287-0.001-26.19-6.393-48.005-18.999-64.839z"/>
				<path d="m356.582,133.105c-5.388-3.125-11.246-5.74-17.412-7.774-3.933-1.296-8.174,0.839-9.472,4.773-1.297,3.934 0.84,8.174 4.773,9.472 5.184,1.71 10.09,3.898 14.583,6.504 1.185,0.687 2.479,1.014 3.756,1.014 2.586,0 5.103-1.34 6.495-3.738 2.08-3.583 0.86-8.172-2.723-10.251z"/>
			</g>
		</svg>
    }
}

export default Party