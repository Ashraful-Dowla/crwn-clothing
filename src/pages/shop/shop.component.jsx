import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import WithSpinner from '../../components/with-spinner/with-spinner.component';

import CollectionsOverview  from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';
import { updateCollections } from '../../redux/shop/shop.actions';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
    
    state = {
        loading: true
    };

    unsuscribeFromSnapShot = null;

    componentDidMount(){
        const { updateCollections } = this.props;
        const collectionRef = firestore.collection('collections');

        // fetch(
        //     'https://firestore.googleapis.com/v1/projects/crwn-db-8f38b/databases/(default)/documents/collections'
        // )
        // .then(response=> response.json())
        // .then(collections => console.log(collections));
        /* Promsie  */
        
        collectionRef.get().then(snapShot =>{
            const collectionMap = convertCollectionsSnapshotToMap(snapShot);
            updateCollections(collectionMap);
            this.setState({ loading: false});
        });

        /* Observer Pattern */
        // this.unsuscribeFromSnapShot = collectionRef.onSnapshot(async snapShot =>{
        //     const collectionMap = convertCollectionsSnapshotToMap(snapShot);
        //     updateCollections(collectionMap);
        //     this.setState({ loading: false});
        // });
    }
    render(){
        const { match } = this.props;
        const { loading } = this.state;
        return (
            <div className="shop-page">
                <Route 
                    exact
                    path={`${match.path}`} 
                    render={(props)=> (
                        <CollectionsOverviewWithSpinner isLoading={loading} {...props}/>
                    )}
                />
                <Route 
                    path={`${match.path}/:collectionId`} 
                    render={(props)=> (
                        <CollectionPageWithSpinner isLoading={loading} {...props}/>
                    )}
                />
            </div>
        );
    }
};

const mapDispatchToProps = dispatch =>({
    updateCollections: (collectionMap) => dispatch(updateCollections(collectionMap))
});

export default connect(null, mapDispatchToProps)(ShopPage);