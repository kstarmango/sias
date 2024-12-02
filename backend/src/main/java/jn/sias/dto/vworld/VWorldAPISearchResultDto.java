package jn.sias.dto.vworld;

import lombok.Builder;

import java.util.List;

@Builder
public class VWorldAPISearchResultDto<T> {

    protected List<T> items;
    protected int totalCounts;
    protected int totalPages;

    public int getTotalPages() {

        return totalPages;
    }
    public int getTotalCounts() {

        return totalCounts;
    }

    public void mergeItems(VWorldAPISearchResultDto other) {

        if(other == null)   return;
        this.getItems().addAll(other.getItems());
    }

    public List<T> getItems(){

        return items;
    }

}

