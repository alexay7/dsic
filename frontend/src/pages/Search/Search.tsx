import React from "react";

import {useSearchParams} from "react-router-dom";

import {PageContainer} from "../../components/PageContainer/PageContainer";
import {SearchComponent} from "../../components/SearchComponent/SearchComponent";

export function Search():React.ReactElement {
    const [searchParams] = useSearchParams();
    console.log(searchParams.toString());

    return (
        <PageContainer>
            <SearchComponent/>
        </PageContainer>
    );
}