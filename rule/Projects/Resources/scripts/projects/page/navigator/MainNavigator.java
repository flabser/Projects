package projects.page.navigator;

import com.exponentus.scripting._Session;
import com.exponentus.scripting._WebFormData;
import com.exponentus.scripting.event._DoPage;
import com.exponentus.scripting.outline._Outline;
import com.exponentus.scripting.outline._OutlineEntry;
import com.exponentus.scriptprocessor.page.IOutcomeObject;

import java.util.ArrayList;
import java.util.List;

public class MainNavigator extends _DoPage {

    @Override
    public void doGET(_Session session, _WebFormData formData) {
        List<IOutcomeObject> list = new ArrayList<IOutcomeObject>();

        _Outline common_outline = new _Outline(getLocalizedWord("projects", session.getLang()), "common");
        common_outline.addEntry(new _OutlineEntry(getLocalizedWord("projects", session.getLang()), "project-view"));
        common_outline.addEntry(new _OutlineEntry(getLocalizedWord("tasks", session.getLang()), "task-view"));

        list.add(common_outline);

        addValue("outline_current", formData.getValueSilently("id").replace("-form", "-view"));
        addContent(list);
    }
}
