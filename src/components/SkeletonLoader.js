import React from "react"
import ContentLoader from "react-content-loader"
import PropTypes from 'prop-types';






const SkeletonLoader = ({ count,key }) => {

    const countSkeleton = () => {
        var rows = [];
        for (var i = 0; i < count; i++) {
            rows.push(

                    <div className="col-md-4">
                        <ContentLoader
                            key={count}
                            speed={3}
                            width={400}
                            height={160}
                            viewBox="0 0 400 160"
                            backgroundColor="#f3f3f3"
                            foregroundColor="#ecebeb"
                        >

                            <rect x="0" y="0" rx="3" ry="3" width="500" height="120"/>


                        </ContentLoader>
                </div>
            );
        }
        return rows
    }

    return (
        <div className="row">
            {countSkeleton()}
        </div>
    )
}
SkeletonLoader.propTypes = {
    count: PropTypes.number.isRequired
};


export default SkeletonLoader
