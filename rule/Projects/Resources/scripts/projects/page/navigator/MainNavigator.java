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

        _Outline root = new _Outline("", "common");

        _OutlineEntry taskEntry = new _OutlineEntry("", "task-view");
        taskEntry.addEntry(new _OutlineEntry(getLocalizedWord("inbox", session.getLang()), "", "task-inbox", "p?id=task-view&for=inbox"));
        taskEntry.addEntry(new _OutlineEntry(getLocalizedWord("week", session.getLang()), "", "task-week", "p?id=task-view&for=week"));
        taskEntry.addEntry(new _OutlineEntry(getLocalizedWord("all", session.getLang()), "", "task-all", "p?id=task-view&for=all"));
        taskEntry.addEntry(new _OutlineEntry(getLocalizedWord("completed", session.getLang()), "", "task-completed", "p?id=task-view&for=completed"));
        taskEntry.addEntry(new _OutlineEntry(getLocalizedWord("my_tasks", session.getLang()), "", "task-my", "p?id=task-view&for=my"));
        root.addEntry(taskEntry);

        root.addEntry(new _OutlineEntry(getLocalizedWord("projects", session.getLang()), "project-view"));

        list.add(root);

        // addValue("outline_current", formData.getValueSilently("id").replace("-form", "-view"));
        addContent(list);
    }
}
