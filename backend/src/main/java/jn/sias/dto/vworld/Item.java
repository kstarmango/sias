package jn.sias.dto.vworld;

public class Item {

    public String id;
    public String title;
    public String category;
    public String geometry;
    public Point point;

    public String getId() {
        return id;
    }

    public String removePrefix(String prefix) {

        return title.replace(prefix, "").trim();
    }
}
